import * as React from 'react'

const styles = require('./style.less')

export default ({ name, amount, completed, remove, update }) => (
  <li className={styles.item}>
    <input type='checkbox' className={styles.toggle} onClick={update} checked={completed} readOnly/>
    <label className={completed ? styles.completed : ''}>
      {name} - {amount}
    </label>
    <button className={styles.destroy} onClick={remove}/>
  </li>
)
