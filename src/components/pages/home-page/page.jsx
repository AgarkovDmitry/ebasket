import React from 'react'

import AddProductForm from 'components/forms/add-product-form'
import ProductList from 'components/lists/product-list'
import ProductPaginator from 'components/paginators/product-paginator'
import ProductFilter from 'components/filters/product-filter'

import styles from './style.less'

export default () => (
  <div className={styles.page}>
    <AddProductForm/>
    <ProductList/>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <ProductPaginator/>
      <ProductFilter/>
    </div>
  </div>
) 