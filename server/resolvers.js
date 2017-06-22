import { PubSub } from 'graphql-subscriptions'

import Basket from './models/basket'
import Product from './models/product'

const pubsub = new PubSub()

const resolvers = {
  Query: {
    async products(root, { _id }){
      if (_id) return await Product.find({ _id }).sort({ modifyDate: -1 })
      else return await Product.find().sort({ modifyDate: -1 })
    },

    async basket(root, { name, password }){
      return await Basket.findOne({ name, password })
    },
    async product(root, { _id }){
      return await Product.findOne({ _id })
    },
  },
  Mutation: {
    async createProduct(root, props){
      const product = await Product.create({
        ...props,
        completed: false,
        modifyDate: Date.now()
      })
      
      pubsub.publish('productCreated', { productCreated: product })
    },
    async updateProduct(root, props){
      await Product.update({ _id: props._id }, { $set: { ...props, modifyDate: Date.now() } })
      
      pubsub.publish('productUpdated', { productUpdated: props })
    },
    async removeProduct(root, { _id }){
      await Product.remove({ _id })
      
      pubsub.publish('productRemoved', { productRemoved: _id })
    },
  },
  Subscription: {
    productCreated: {
      subscribe: () => pubsub.asyncIterator('productCreated')
    },
    productUpdated: {
      subscribe: () => pubsub.asyncIterator('productUpdated')
    },
    productRemoved: {
      subscribe: () => pubsub.asyncIterator('productRemoved')
    }
  }
}

module.exports = resolvers
