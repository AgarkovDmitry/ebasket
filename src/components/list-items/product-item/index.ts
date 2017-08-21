import { observer, inject } from 'mobx-react'
import { compose, branch, renderComponent, mapProps, lifecycle } from 'recompose'

import Component from './component'
import Loader from 'components/others/loader'

export default compose(
  inject('socket'),
  lifecycle({
    componentDidMount() {
      const { item, socket } = this.props
      item.data.name || socket.fetchProduct(item)
    }
  }),
  observer,
  mapProps(
    ({ socket, item }) => ({
      ...item.data,
      remove: () => socket.removeProduct({ _id: item.data._id }),
      update: () => socket.updateProduct({ _id: item.data._id, completed: !item.data.completed })
    })
  ),
  branch(
    ({ name }) => !name,
    renderComponent(Loader)
  )
)(Component)
