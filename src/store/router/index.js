import { action } from 'mobx'
import createBrowserHistory from 'history/createBrowserHistory'

import HomeStore from './pages/home-page'

class RouterStore {
  graphX
  history
  page

  constructor(graphX) {
    this.history = createBrowserHistory()
    this.graphX = graphX

    switch (this.history.location.pathname) {
      case '/': {
        this.graphX.products.fetch()
        this.page = new HomeStore(graphX)
        break
      }
    }
  }

  @action showHome() {
    this.graphX.products.fetch()
    this.history.push('/')
    this.page = new HomeStore(this.graphX)
  }

  @action showSmth() {
    this.history.push('/smth')
  }
}

export default RouterStore