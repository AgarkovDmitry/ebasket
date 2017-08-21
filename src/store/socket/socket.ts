class Socket {
  socket
  subscriptions
  callbacks = {}
  queue: Array<Function> = []

  constructor(subscriptions) {
    this.subscriptions = subscriptions
    this.open()
  }

  subscribe() {
    const queries = {
      productCreated: 'subscription { productCreated { _id, name, amount, completed } }',
      productUpdated: 'subscription { productUpdated { _id, name, amount, completed } }',
      productRemoved: 'subscription { productRemoved }'
    }

    const keys = ['productCreated', 'productUpdated', 'productRemoved']

    keys.map(id => {
      this.callbacks[id] = this.subscriptions[id]
      this.send({ type: 'start', id, payload: { query: queries[id] } })
    })
  }

  mutate(key, variables, cb) {
    const queries = {
      createProduct: `mutation createProduct($name: String!, $amount: String!) {
        createProduct(name: $name, amount: $amount)
      }`,
      updateProduct: `mutation updateProduct($_id: ID!, $name: String, $amount: String, $completed: Boolean) {
        updateProduct(_id: $_id, name: $name, amount: $amount, completed: $completed)
      }`,
      removeProduct: `mutation removeProduct($_id: ID!) {
        removeProduct(_id: $_id)
      }`
    }

    const id = `${key}-${variables._id || 0}`

    this.callbacks[id] = cb
    this.send({ type: 'start', id, payload: { query: queries[key], variables } })
  }

  open() {
    this.socket = new WebSocket(`${location.protocol.replace('http', 'ws')}/${location.host}/subscriptions`, ['graphql-ws'])

    this.send({ type: 'connection_init', payload: {} })
    this.subscribe()

    this.socket.onmessage = ({ data }) => {
      const res = JSON.parse(data)
      if (res.type == 'data') {
        const cb = this.callbacks[res.id]
        console.log(res.payload.data)
        const key = Object.keys(res.payload.data)[0]
        if (cb) cb(res.payload.data[key])
      }
    }

    this.socket.onopen = () => this.queue.splice(0).map(f => f())

    this.socket.onclose = () => setTimeout(() => this.open(), 2000)
  }

  send(data) {
    if (this.socket.readyState == 1)
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
    const query = `query { product (_id: "${_id}"){ _id, ${fields} } }`
    const id = `fetchProduct ${_id}`

    this.callbacks[id] = cb
    this.send({ id, type: 'start', payload: { query } })
  }

  createProduct = (variables, cb) => this.mutate('createProduct', variables, cb)
  updateProduct = (variables, cb) => this.mutate('updateProduct', variables, cb)
  removeProduct = (variables, cb) => this.mutate('removeProduct', variables, cb)
}

export default Socket