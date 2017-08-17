import * as React from 'react'
import { Router, Route, Switch } from 'react-router'
import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import Loadable from 'react-loadable'

const styles = require('./style.less')

import Header from 'components/others/header'
import loading from 'components/others/loader'

import Home from 'components/pages/home-page'
// const Home = Loadable({
//   loader: () => import('components/pages/home-page'),
//   loading
// })

export default ({ store }) => (
  <Provider {...store}>
    <Router history={store.router.history}>
      <div>
        <Header/>
        <div className={styles.page}>
          <div className={styles.wrapper}>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/smth' component={() =>
                <span> What are you doing here? </span>
              }/>
            </Switch>
          </div>
        </div>
        <DevTools />
      </div>
    </Router>
  </Provider>
)
