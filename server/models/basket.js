const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Basket = new Schema({
  name: { type: String, unique: true },
  password: String
})

export default mongoose.model('Basket', Basket, 'Basket')
