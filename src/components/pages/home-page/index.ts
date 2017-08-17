import { observer, inject } from 'mobx-react'
import { compose, branch, renderComponent, mapProps } from 'recompose'

import Loader from 'components/others/loader'

import Component from './component'

export default compose(
  inject('graphQL'),
  observer
)(Component)