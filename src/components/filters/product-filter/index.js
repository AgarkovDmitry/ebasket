import { observer, inject } from 'mobx-react'
import { compose, branch, renderNothing, mapProps } from 'recompose'

import Filter from './filter'

export default compose(
  inject('router'),
  observer,
  branch(
    ({ router }) => !router.page.products,
    renderNothing
  ),
  mapProps(
    ({ router }) => ({
      complete: router.page.complete,
      active: router.page.active
    })
  ),
  observer
)(Filter)