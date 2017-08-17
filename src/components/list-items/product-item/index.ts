import { observer, inject } from 'mobx-react'
import { compose, branch, renderComponent, mapProps } from 'recompose'

import Component from './component'
import Loader from 'components/others/loader'

export default compose(
  inject('graphQL'),
  observer,
  mapProps(
    ({ graphQL, item }) => ({
      ...item,
      remove: () => graphQL.removeProduct({ _id: item._id }),
      update: () => graphQL.updateProduct({ _id: item._id, completed: !item.completed })
    })
  ),
  branch(
    ({ name }) => !name,
    renderComponent(Loader)
  )
)(Component)
