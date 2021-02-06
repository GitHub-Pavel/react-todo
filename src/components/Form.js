import React, { Component } from 'react'

import './Form.css'

export default class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      historyText: ''
    }

    this.resetInput = this.resetInput.bind(this)

    this.back = this.back.bind(this)

    this.addList = this.addList.bind(this)

    this.handleChange = this.handleChange.bind(this)
  }

  resetInput(e) {
    e.preventDefault()

    this.props.list.map((index, key) => {
      if (index.edit) {
        return this.props.list[key].text = ''
      }
    })

    this.setState(state => ({
      value: ''
    }))
  }

  back(e) {
    e.preventDefault()

    this.props.list.map((index, key) => {
      if(index.edit) {
        this.props.list[key].text = this.state.historyText
      } 
    })

    this.setState(state => ({
      value: '',
      historyText: ''
    }))
    this.props.disEdit()
  }

  addList(e) {
    e.preventDefault()

    let inputBool = false

    for(let index of this.props.list) {
      if(index.edit) {
        inputBool = index.edit
      } 
    }
    
    if (inputBool) {
      this.setState(state => ({
        value: ''
      }))
      this.props.disEdit()

      return false
    }

    const form = new FormData(e.target)

    for (let value of form) {
      this.props.listPush({
        keyIndex: this.props.list.length,
        text: value[1],
        condition: false,
        edit: false
      })
    }

    localStorage.setItem('list', JSON.stringify(this.props.list))
    localStorage.setItem('listDone', JSON.stringify(this.props.listDone))

    this.resetInput(e)
  }

  handleChange(e) {
    this.props.list.map((index, key) => {
      if (index.edit) {
        return this.props.list[key].text = e.target.value
      }
    })

    this.setState(state => ({
      value: e.target.value
    }))
  }

  render() {
    let inputTextRen = ''
    let inputBool = false

    for(let index of this.props.list) {
      if(index.edit) {
        inputTextRen = index.text
        inputBool = index.edit
        if (this.state.historyText === '') {
          this.state.historyText = index.text
        }
      } 
    }

    return (
      <form 
        className='tasks-form'
        onSubmit={this.addList}
      >
        <label className='tasks-form__label'>
          <input 
            className='input tasks-form__input' 
            type='text' name='taskname' 
            placeholder='Название задачи' 
            required='required'
            value={inputBool ? inputTextRen : this.state.value}
            onChange={this.handleChange} 
          />
          <button 
            className='tasks-form__times'
            onClick={this.resetInput}
            title='Удалить'
          >
            &times;
          </button>
          <button
            className={`tasks-form__back ${inputBool ? 'tasks-form__back--active' : ''}`}
            onClick={this.back}
          >
            Отмена
          </button>
        </label>
        <button 
          className='btn tasks-form__submit' 
          type='submit'
        >
          {inputBool ? 'Изменить' : 'Создать'}
        </button>
      </form>
    )
  }
}
