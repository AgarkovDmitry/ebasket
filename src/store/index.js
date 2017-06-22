import graphX from './graphX'
import router from './router'

class Store {
  graphQL
  router

  constructor() {
    this.graphQL = new graphX()
    this.router = new router(this.graphQL)
  }
}

export default Store