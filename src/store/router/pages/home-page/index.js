import { observable, action, computed } from 'mobx'

class HomeStore {
  @observable graphX
  @observable filter = undefined
  @observable pagSize = 8
  @observable pagIndex = 0

  constructor(graphX) {
    this.graphX = graphX
  }

  @action active = () => this.filter = this.filter == false ? undefined : false
  @action complete = () => this.filter = this.filter == true ? undefined : true

  @action updatePagIndex = index => this.pagIndex = index

  @computed get isPaginated() {
    let products = this.graphX.products.data
    if (this.filter != undefined)
        products = products.filter(item => item.completed == this.filter)
    return products.length > this.pagSize
  }

  @computed get lastIndex() {
    let products = this.graphX.products.data

    return Math.floor((products.length - 1) / this.pagSize)
  }

  @computed get products() {
    let products = this.graphX.products.data
    if (this.filter != undefined)
        products = products.filter(item => item.completed == this.filter)
    if (products.length > this.pagSize)
        products = products.slice(this.pagIndex * this.pagSize, this.pagIndex * this.pagSize + this.pagSize)

    products.map(item => item.fetch())

    return products
  }
}

export default HomeStore