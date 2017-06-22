import { observer, inject } from 'mobx-react'
import { compose, branch, renderNothing, mapProps } from 'recompose'

import Paginator from './paginator'

export default compose(
  inject('router'),
  observer,
  branch(
    ({ router }) => !router.page.isPaginated,
    renderNothing
  ),
  mapProps(
    ({ router }) => ({
      pagIndex: router.page.pagIndex,
      prevIndex: () => router.page.updatePagIndex(router.page.pagIndex - 1),
      nextIndex: () => router.page.updatePagIndex(router.page.pagIndex + 1),
      lastIndex: router.page.lastIndex,
    })
  ),
  observer
)(Paginator)