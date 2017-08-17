import * as React from 'react'
import { observable, action, computed } from 'mobx'

import AddProductForm from 'components/forms/add-product-form'
import Product from 'components/list-items/product-item'

const styles = require('./style.less')

interface Props{
  graphQL: any
}

export default class extends React.Component<Props, null> {
  graphQL: any
  pagSize: number = 8
  @observable filter: boolean = undefined
  @observable pagIndex: number = 0

  @action active = () => this.filter = this.filter == false ? undefined : false
  @action complete = () => this.filter = this.filter == true ? undefined : true
  @action prevIndex = () => this.pagIndex = this.pagIndex > 0 ? this.pagIndex - 1 : this.pagIndex
  @action nextIndex = () => this.pagIndex = this.pagIndex < this.lastIndex ? this.pagIndex + 1 : this.pagIndex

  constructor(props) {
    super(props)
    this.graphQL = this.props.graphQL

    this.active = this.active.bind(this)
    this.complete = this.complete.bind(this)
    this.prevIndex = this.prevIndex.bind(this)
    this.nextIndex = this.nextIndex.bind(this)
  }

  @computed get isPaginated() {
    let products = this.graphQL.products.data
    if (this.filter != undefined)
        products = products.filter(item => item.completed == this.filter)
    return products.length > this.pagSize
  }

  @computed get lastIndex() {
    let products = this.graphQL.products.data

    return Math.floor((products.length - 1) / this.pagSize)
  }

  @computed get products() {
    let products = this.graphQL.products.data
    if (this.filter != undefined)
        products = products.filter(item => item.completed == this.filter)
    if (products.length > this.pagSize)
        products = products.slice(this.pagIndex * this.pagSize, this.pagIndex * this.pagSize + this.pagSize)

    products.map(item => item.fetch())

    return products
  }

  render() {
    return (
      <div className={styles.page}>
        <AddProductForm/>
        <ul className={styles.list}>
        {
          this.products.map(
            product => <Product key={product._id} item={product}/>
          )
        }
        </ul>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {
            this.isPaginated && <div>
              <button onClick={this.prevIndex} disabled={this.pagIndex == 0}> {'<'} </button>
              <button> {this.pagIndex + 1} </button>
              <button onClick={this.nextIndex} disabled={this.pagIndex == this.lastIndex}> {'>'} </button>
            </div>
          }
          <div>
            <button onClick={this.complete}> Active </button>
            <button onClick={this.active}> Completed </button>
          </div>
        </div>
      </div>
    )
  }
}