const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Position = new Schema({
  name: String,
  amount: String,

  completed: Boolean,
  modifyDate: Date,

  basket: { type: Schema.Types.ObjectId, ref: 'Basket' }
})

export default mongoose.model('Position', Position, 'Position')
