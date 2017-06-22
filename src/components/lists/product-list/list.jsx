import React from 'react'
import Product from 'components/list-items/product-item'

import styles from './style.less'

export default ({ products }) => (
  <ul className={styles.list}>
  {
    products.map(product => <Product key={product._id} item={product}/>)
  }
  </ul>
)