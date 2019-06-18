import React from 'react'
import { path } from 'ramda'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'

import AttachmentList from './AttachmentList'
import ProductImage from './ProductImage'
import ProductQuantityStepper from './ProductQuantityStepper'
import ProductSummaryPrice from './ProductSummaryPrice'
import ProductSummaryName from './ProductSummaryName'

import styles from '../../productSummary.css'

const ProductSummaryInlinePrice = ({
  product,
  showBorders,
  handleMouseEnter,
  handleMouseLeave,
  handleItemsStateUpdate,
  actionOnClick,
  imageProps,
  nameProps,
  priceProps,
  showQuantitySelector,
  priceAlignLeft,
  muted,
}) => {
  const containerClasses = classNames(
    styles.container,
    styles.containerInline,
    'overflow-hidden br3 h-100 w-100'
  )

  const summaryClasses = classNames(
    `${styles.element} pointer ph2 pt3 pb4 flex flex-column h-100`,
    {
      'bb b--muted-4 mh2 mh3-ns mt2': showBorders,
    }
  )

  const nameClasses = {
    containerClass: classNames(
      'flex items-start justify-left tl w-90 t-mini pb2',
      { 'c-muted-1': muted }
    ),
    brandNameClass: classNames('t-body', {
      'c-muted-1': muted,
      'c-on-base': !muted,
    }),
    skuNameClass: classNames('t-small', {
      'c-muted-2': muted,
    }),
  }

  const priceClasses = {
    containerClass: classNames('flex flex-column nr1 h1', {
      'items-start': priceAlignLeft,
      'items-end': !priceAlignLeft,
      [`${styles.priceContainer} pv5`]: !showBorders,
    }),
    sellingPriceClass: classNames('dib ph2 t-body t-heading-5-ns', {
      'c-muted-1': muted,
    }),
  }

  return (
    <section
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article className={summaryClasses}>
        <Link
          className={`${styles.clearLink} flex h-100`}
          page="store.product"
          params={{ slug: path(['linkText'], product) }}
          onClick={actionOnClick}
        >
          <div className={`${styles.imageContainer} db h-100`}>
            <ProductImage {...imageProps} />
          </div>
          <div className={`${styles.information} w-70 pb2 pl3 pr3`}>
            <ProductSummaryName {...nameProps} {...nameClasses} />
            <AttachmentList product={product} />
            <div className="mt3 nr2">
              <div
                className={`flex justify-end nr4 mb2 ${
                  styles.quantityStepperContainer
                }`}
              >
                {showQuantitySelector && (
                  <ProductQuantityStepper
                    product={product}
                    onUpdateItemsState={handleItemsStateUpdate}
                  />
                )}
              </div>
              <ProductSummaryPrice {...priceProps} {...priceClasses} />
            </div>
          </div>
        </Link>
      </article>
    </section>
  )
}

export default ProductSummaryInlinePrice
