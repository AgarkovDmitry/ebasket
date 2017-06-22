import ProductStore from './product-store'
import socket from './socket'

class GraphQL {
  products = new ProductStore()

  constructor(){
    socket.productCreated(res => this.products.create(res))
    socket.productRemoved(res => this.products.remove(res))
    socket.productUpdated(res => this.products.update(res))
  }

  createProduct = variables => socket.createProduct(variables)
  removeProduct = variables => socket.removeProduct(variables)
  updateProduct = variables => socket.updateProduct(variables)
}

export default GraphQL