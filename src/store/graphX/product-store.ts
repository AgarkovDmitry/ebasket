import { observable, action } from 'mobx'

import socket from './socket'
import Product from './product'

class ProductStore {
  @observable data = []

  @action create(product) {
    this.data.unshift(new Product(product))
  }

  @action update(product) {
    this.data.find(item => item._id == product._id).update(product)
  }

  @action remove(_id) {
    const index = this.data.findIndex(item => item._id == _id)
    this.data.splice(index, 1)
  }

  @action fetch(fields, force) {
    if (this.data.length == 0 || force)
      socket.fetchProducts(fields, res => this.data.push(
        ...res.map(item => new Product(item))
      ))
  }
}

export default ProductStore