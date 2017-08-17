import * as React from 'react'
import { observable, action, computed } from 'mobx'

const styles = require('./style.less')

interface Props{
  createProduct: Function
}

class Form extends React.Component<Props, null> {
  @observable name: String = ''
  @observable amount: String = '0'

  @observable error: String

  @action updateName = e => this.name = e.target.value
  @action updateAmount = e => this.amount = e.target.value

  @computed get valid() {
    if (!this.name) {
      this.error = 'Name is required'
      return false
    }
    else
      return true
  }

  @action submit = e => {
    e.preventDefault()

    if (this.valid) this.props.createProduct({
      name: this.name,
      amount: this.amount
    })
  }

  render() {
    return (
      <form onSubmit={this.submit} className={styles.form}>
        <input type='text' onChange={this.updateName} placeholder='What needs to be bought?' className={styles.name}/>
        <input type='text' onChange={this.updateAmount} placeholder='How many/much?' className={styles.amount}/>
        <button type='submit' className={styles.button}>Add</button>
      </form>
    )
  }
}

export default Form