import React from 'react'

import styles from './style.less'

export default ({ complete, active }) => (
  <div className={styles.buttons}>
    <button onClick={active} className={styles.buttonActive}> Active </button>
    <button onClick={complete} className={styles.buttonCompleted}> Completed </button>
  </div>
)