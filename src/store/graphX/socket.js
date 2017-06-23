class Socket {
  socket
  callbacks = {}
  queue = []

  constructor() {
    this.socket = new WebSocket(`${location.post.replace('http', 'ws')}://${location.host}/subscriptions`, ['graphql-ws'])

    this.socket.onmessage = e => {
      const res = JSON.parse(e.data)
      if (res.type == 'data') {
        const cb = this.callbacks[res.id]
        const key = Object.keys(res.payload.data)[0]
        if (cb) cb(res.payload.data[key])
      }
    }
    this.queue.push(() => this.send({ type: 'connection_init', payload: {} }))

    this.socket.onopen = () => this.queue.map(func => func())
  }

  send(data) {
    if (this.socket.readyState)
      this.socket.send(JSON.stringify(data))
    else
      this.queue.push(() => this.socket.send(JSON.stringify(data)))
  }

  fetchProducts(fields = '_id', cb) {
    const query = `query { products { ${fields} } }`
    const id = 'fetchProducts'

    this.callbacks[id] = cb
    this.send({ id, type: 'start', payload: { query } })
  }

  fetchProduct(_id, fields = ['name', 'amount', 'completed'], cb) {
    const query = `query { product (_id: "${_id}"){ ${fields} } }`
    const id = `fetchProduct ${_id}`

    this.callbacks[id] = cb
    this.send({ id, type: 'start', payload: { query } })
  }

  createProduct(variables, cb) {
    const query = `mutation createProduct($name: String!, $amount: String!) {
      createProduct(name: $name, amount: $amount)
    }`
    const id = 'createProduct'

    this.callbacks[id] = cb
    this.send({ id, type: 'start', payload: { query, variables } })
  }

  updateProduct (variables, cb) {
    const query = `mutation updateProduct($_id: ID!, $name: String, $amount: String, $completed: Boolean) {
      updateProduct(_id: $_id, name: $name, amount: $amount, completed: $completed)
    }`
    const id = 'updateProduct'

    this.callbacks[id] = cb
    this.send({ id, type: 'start', payload: { query, variables } })
  }

  removeProduct({ _id }, cb) {
    const query = `mutation { removeProduct(_id: "${_id}") }`
    const id = 'removeProduct'

    this.callbacks[id] = cb
    this.send({ id, type: 'start', payload: { query } })
  }

  productCreated(cb) {
    const query = 'subscription { productCreated { _id, name, amount, completed } }'
    const id = 'productCreated'

    this.callbacks[id] = cb
    this.send({ id, type: 'start', payload: { query } })
  }

  productUpdated(cb) {
    const query = 'subscription { productUpdated { _id, name, amount, completed } }'
    const id = 'productUpdated'

    this.callbacks[id] = cb
    this.send({ id, type: 'start', payload: { query } })
  }

  productRemoved(cb) {
    const query = 'subscription { productRemoved }'
    const id = 'productRemoved'

    this.callbacks[id] = cb
    this.send({ id, type: 'start', payload: { query } })
  }
}

export default new Socket()