import React from 'react'

import ListDoneItem from './ListDoneItem'
import './List.css'

export default function List(props) {
  const items = props.listDone.map((value, key) => !value.edit ? 
    <ListDoneItem 
      key={key} 
      keyIndex={value.keyIndex} 
      text={value.text} 
      condition={value.condition} 
      edit={value.edit} 
      delete={props.removeFunc} 
      editCond={props.editCondition} 
    /> : false
  )

  const titleText = props.listDone.length === 0 ? '' : 'Решенные задачи'

  return (
    <section className='section'>
      <h2>{titleText}</h2>
      <ul className='tasks-list'>
        {items}
      </ul>
    </section>
  )
}

