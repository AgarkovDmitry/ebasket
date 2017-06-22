import { observer, inject } from 'mobx-react'
import { compose, mapProps } from 'recompose'

import Form from './Form'

export default compose(
  inject('graphQL'),
  observer,
  mapProps(
    ({ graphQL }) => ({ createProduct: graphQL.createProduct })
  )
)(Form)
