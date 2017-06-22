import express from 'express'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import wdm from 'webpack-dev-middleware'
import whm from 'webpack-hot-middleware'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { createServer } from 'http'
import mongoose from 'mongoose'

const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = require('./server/typeDefs')
const resolvers = require('./server/resolvers')

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${'admin'}:${'190496'}@ds137441.mlab.com:37441/wallet-tracker`)

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()

if (process.env.NODE_ENV !== 'production') {
  const config = require('./webpack.config')
  const compiler = webpack(config)

  app.use(wdm(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  app.use(whm(compiler))
}

app.use(express.static(`${__dirname}/dist`))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
  schema,
  context: req.headers.token
})))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.get('/*', (req, res) => res.sendFile(__dirname + '/dist/index.html'))

const server = createServer(app)

server.listen(process.env.PORT || 5000, () => {
  new SubscriptionServer({
      schema,
      execute,
      subscribe
    }, {
      server: server,
      path: '/subscriptions',
    })
})