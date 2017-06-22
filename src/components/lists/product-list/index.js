import { inject, observer } from 'mobx-react'
import { compose, branch, renderComponent, mapProps } from 'recompose'

import List from './list'
import ZeroPositions from 'components/others/exceptions/zero-positions'

export default compose(
  inject('router'),
  observer,
  branch(
    ({ router }) => !router.page.products,
    renderComponent(ZeroPositions)
  ),
  mapProps(
    ({ router }) => ({ products: router.page.products })
  )
)(List)