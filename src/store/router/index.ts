import { action } from 'mobx'
import createBrowserHistory from 'history/createBrowserHistory'

class RouterStore {
  graphX
  history

  constructor(graphX) {
    this.history = createBrowserHistory()
    this.graphX = graphX

    switch (this.history.location.pathname) {
      case '/': {
        this.graphX.products.fetch()
        break
      }
    }
  }

  @action showHome() {
    this.graphX.products.fetch()
    this.history.push('/')
  }

  @action showSmth() {
    this.history.push('/smth')
  }
}

export default RouterStore