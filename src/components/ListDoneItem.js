import React, { Component } from 'react'

import './ListItem.css'

export default class ListItem extends Component {
  constructor(props) {
    super(props)

    this.deleteList = this.deleteList.bind(this)
  }

  deleteList(e) {
    this.props.delete(e, false)
  }

  render() {
    return (
      <li className='tasks-list__item'>
        <label className='check tasks-list__label'>
          <input 
            className='check__input visually-hidden tasks-list__input'
            type='checkbox'
            value={this.props.keyIndex}
            onChange={this.deleteList}
            checked
          />
          <span className='check__box'></span>
          <span className={this.props.condition ? 'text--through check__text task-list__text' : 'check__text task-list__text' }>{this.props.text}</span>
        </label>
        <button 
          className='tasks-list__remove'
          onClick={this.deleteList}
          title='Удалить из выполненных'
        >
          &times;
        </button>
      </li>
    )
  }
}
