import React, { Component } from 'react'

import Form from './Form'
import List from './List'
import ListDone from './ListDone'

export default class Todo extends Component {
  constructor(props) {
    super(props)


    if (localStorage.list === undefined) localStorage.setItem('list', JSON.stringify([]))
    if (localStorage.listDone === undefined) localStorage.setItem('listDone', JSON.stringify([]))

    this.state = {
      list: JSON.parse(localStorage.getItem("list")),
      listDone: JSON.parse(localStorage.getItem("listDone"))
    }

    this.listPush = this.listPush.bind(this)
    this.editList = this.editList.bind(this)
    this.editCondition = this.editCondition.bind(this)
    this.editFunc = this.editFunc.bind(this)
    this.disEdit = this.disEdit.bind(this)
  }

  editFunc(e) {
    const listState = this.state.list

    for(let item of listState) {
      item.edit = false
      if (item.keyIndex === +e.target.closest('.tasks-list__item').getAttribute('data-id')) {
        item.edit = true
      }
    }

    this.setState(state => ({
      list: listState
    }))

    localStorage.setItem('list', JSON.stringify(this.state.list))
  }

  disEdit() {
    const confList = this.state.list

    for(let item of confList) {
      item.edit = false
    }

    this.setState(state => ({
      list: confList
    }))

    localStorage.setItem('list', JSON.stringify(this.state.list))
  }

  listPush(item) {
    this.setState(state => ({
      list: [...this.state.list, item]
    }))

    localStorage.setItem('list', JSON.stringify(this.state.list))
  }

  editList(e, bool) {
    const who = bool ? this.state.list : this.state.listDone
    let listInn = this.state.list
    const itemsArray = []
    const itemKey = e.target.closest('.tasks-list__item').querySelector('.tasks-list__input').value
    
    who.map((index, value) => index.keyIndex !== +itemKey ? itemsArray.push(index) : listInn.push(index) )    

    this.setState(state => ( bool ? {
      list: itemsArray
    } : {
      listDone: itemsArray,
      list: listInn
    }))

    localStorage.setItem('list', JSON.stringify(this.state.list))
    localStorage.setItem('listDone', JSON.stringify(this.state.listDone))
  }

  editCondition(e, cond) {
    let itemsArray = cond ? this.state.list : this.state.listDone
    let itemsArraySecond = !cond ? this.state.list : this.state.listDone
    const itemKey = e.target.closest('.tasks-list__item').querySelector('.tasks-list__input').value
    let allArray = []

    for (let index of itemsArray) {
      if (index.keyIndex === +itemKey) {
        index.condition = cond
        itemsArraySecond.push(index)
      } else {
        allArray.push(index)
      }
    }

    this.setState(state => ({
      list: allArray,
      listDone: itemsArraySecond
    }))
    

    localStorage.setItem('list', JSON.stringify(this.state.list))
    localStorage.setItem('listDone', JSON.stringify(this.state.listDone))
  }

  render() {
    localStorage.setItem('list', JSON.stringify(this.state.list))
    localStorage.setItem('listDone', JSON.stringify(this.state.listDone))

    console.log(localStorage.list, localStorage.listDone)

    return (
      <section className='section'>
        <div className='container'>
          <Form 
            list={this.state.list}
            listPush={this.listPush}
            disEdit={this.disEdit}
          />
          <List 
            list={this.state.list}
            removeFunc={this.editList}
            editCondition={this.editCondition}
            editFunc={this.editFunc}
          />
          <ListDone 
            listDone={this.state.listDone}
            removeFunc={this.editList}
            editCondition={this.editCondition}
          />
        </div>
      </section>
    )
  }
}
