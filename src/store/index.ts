import data from './data'
import socket from './socket'


class Store {
  data
  socket

  constructor() {
    this.data = new data()
    this.socket = new socket(this.data)
  }
}

export default Store