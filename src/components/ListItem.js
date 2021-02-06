import React, { Component } from 'react'

import './ListItem.css'

export default class ListItem extends Component {
  constructor(props) {
    super(props)

    this.inputChange = this.inputChange.bind(this)
    this.deleteList = this.deleteList.bind(this)
  }

  inputChange(e) {
    this.props.editCond(e, true)
  }

  deleteList(e) {
    this.props.delete(e, true)
  }

  render() {
    return (
      <li 
        className='tasks-list__item'
        data-id={this.props.keyIndex}
      >
        <label className='check tasks-list__label'>
          <input 
            className='check__input visually-hidden tasks-list__input'
            type='checkbox'
            value={this.props.keyIndex}
            onChange={this.inputChange}
          />
          <span className='check__box tasks-list__box--inactive'></span>
          <span className='check__text task-list__text'>{this.props.text}</span>
        </label>
        <button 
          onClick={this.props.editFunc}
          className='tasks-list__edit'
        >
          Изменить
        </button>
        <button 
          className='tasks-list__remove'
          onClick={this.deleteList}
          title='Удалить'
        >
          &times;
        </button>
      </li>
    )
  }
}
