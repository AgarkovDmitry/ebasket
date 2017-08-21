import { observable, action, computed, toJS } from 'mobx'

export default class {
  @observable _data = new Map()

  @computed get data() {
    return toJS(this._data)
  }

  constructor(fields: Array<any>, data) {
    fields.map(field => this._data.set(field, data[field]))
  }

  @action update = (res) => Object.keys(res).map(key => res[key] != null && this._data.set(key, res[key]))
}