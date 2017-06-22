import React from 'react'

import styles from './style.less'

export default ({ name, amount, completed, remove, update }) => (
  <li className={styles.item}>
    <input type='checkbox' className={styles.toggle} onClick={update} defaultChecked={completed}/>
    <label className={completed ? styles.completed : ''}>
      {name} - {amount}
    </label>
    <button className={styles.destroy} onClick={remove}/>
  </li>
)
