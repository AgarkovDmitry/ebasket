const typeDefs = [
`
  type Product {
    _id: ID
    name: String
    amount: String
    completed: Boolean
    basket: ID
  }

  type Query {
    basket(name: String!, password: String): ID!

    product(_id: ID!): Product!
    products(_id: ID): [Product]!
  }

  type Subscription {
    productCreated: Product!
    productUpdated: Product!
    productRemoved: ID!
  }

  type Mutation {
    createProduct(name: String!, amount: String!, basket: ID): ID
    updateProduct(_id: ID!, name: String, amount: String, completed: Boolean, basket: ID): ID
    removeProduct(_id: ID!): ID
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`]

module.exports = typeDefs
