import { observable, action } from 'mobx'
import socket from './socket'

class Product {
  _id
  @observable name
  @observable amount
  @observable completed

  constructor({ _id, name, amount, completed }){
    this._id = _id
    this.name = name
    this.amount = amount
    this.completed = completed
  }

  @action update = res => Object.keys(res).map(key => this[key] = res[key] != undefined ? res[key] : this[key])

  @action fetch(fields = ['name', 'amount', 'completed'], force) {
    const shouldProductBeFetched = fields.reduce((val, field) => val || this[field] == undefined, false)

    if (force || shouldProductBeFetched) socket.fetchProduct(this._id, fields, res => this.update(res))
  }
}

export default Product