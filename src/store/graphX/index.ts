import ProductStore from './product-store'
import socket from './socket'

class GraphQL {
  products = new ProductStore()

  constructor() {
    socket.productCreated(res => this.products.create(res))
    socket.productRemoved(res => this.products.remove(res))
    socket.productUpdated(res => this.products.update(res))
  }

  createProduct = variables => socket.createProduct(variables, null)
  removeProduct = variables => socket.removeProduct(variables, null)
  updateProduct = variables => socket.updateProduct(variables, null)
}

export default GraphQL