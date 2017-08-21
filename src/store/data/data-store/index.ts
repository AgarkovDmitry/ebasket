import { observable, action, computed } from 'mobx'

import ItemStore from './item'

class DataStore {
  @observable _data = new Map()
  item

  @computed get data() {
    return this._data.entries()
  }

  constructor(fields: Array<string>) {
    this.item = item => new ItemStore(fields, item)
  }

  @action create = (item) => this._data.set(item._id, this.item(item))
  @action createItems = (items) => items.map(item => this._data.set(item._id, this.item(item)))
  @action update = (item) => this._data.get(item._id).update(item)
  @action remove = (item) => this._data.delete(item)
}

export default DataStore