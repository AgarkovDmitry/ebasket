import DataStore from './data-store'

export default class {
  products = new DataStore(['_id', 'name', 'amount', 'completed'])
}