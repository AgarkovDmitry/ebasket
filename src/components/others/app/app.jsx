import React from 'react'
import { Router, Route, Switch } from 'react-router'
import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import Loadable from 'react-loadable'

import styles from './style.less'

import Header from 'components/others/header'
import loading from 'components/others/loader'

const Home = Loadable({
  loader: () => import('components/pages/home-page'),
  loading
})

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
