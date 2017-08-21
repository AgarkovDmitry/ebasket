import socket from './socket'

export default class {
  socket
  data

  constructor(data) {
    this.data = data
    this.socket = new socket({
      productCreated: res => this.data.products.create(res),
      productRemoved: res => this.data.products.remove(res),
      productUpdated: res => this.data.products.update(res)
    })
  }

  createProduct = variables => this.socket.createProduct(variables, null)
  removeProduct = variables => this.socket.removeProduct(variables, null)
  updateProduct = variables => this.socket.updateProduct(variables, null)

  fetchProducts = (fields, force) => this.socket.fetchProducts(fields, res => this.data.products.createItems(res))
  fetchProduct = (item, fields = ['name', 'amount', 'completed'], force) => {
    item.name || this.socket.fetchProduct(item.data._id, fields, res => this.data.products.update(res))
  }
}