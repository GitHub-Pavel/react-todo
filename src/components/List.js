import React from 'react'

import ListItem from './ListItem'
import './List.css'

export default function List(props) {
  const items = props.list.map((value, key) => !value.edit ? 
    <ListItem 
      key={key} 
      keyIndex={value.keyIndex} 
      text={value.text} 
      condition={value.condition} 
      edit={value.edit} 
      delete={props.removeFunc} 
      editCond={props.editCondition} 
      editFunc={props.editFunc} 
    /> : false
  )

  return (
    <section className='section'>
      <h2>Все ваши задачи</h2>
      <ul className='tasks-list'>
        {items.length === 0 ? <p>У вас нет задач...</p> : items}
      </ul>
    </section>
  )
}

