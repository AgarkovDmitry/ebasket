import React from 'react'

import styles from './style.less'

export default ({ pagIndex, prevIndex, nextIndex, lastIndex }) => (
  <div className={styles.buttons}>
    <button onClick={prevIndex} className={styles.buttonActive} disabled={pagIndex == 0}> {'<'} </button>
    <button className={styles.buttonActive}> {pagIndex + 1} </button>
    <button onClick={nextIndex} className={styles.buttonCompleted} disabled={pagIndex == lastIndex}> {'>'} </button>
  </div>
)