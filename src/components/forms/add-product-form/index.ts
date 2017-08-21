import { observer, inject } from 'mobx-react'
import { compose, mapProps } from 'recompose'

import Form from './form'

export default compose(
  inject('socket'),
  observer,
  mapProps(
    ({ socket }) => ({ createProduct: socket.createProduct })
  )
)(Form)
