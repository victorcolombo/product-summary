import PropTypes from 'prop-types'
import React, { Component } from 'react'
<<<<<<< HEAD
import { withRuntimeContext } from 'vtex.render-runtime'
import { ProductName, ProductPrice } from 'vtex.store-components'

import ProductSummaryNormal from './components/ProductSummaryNormal'
import ProductSummarySmall from './components/ProductSummarySmall'
import ProductSummaryInline from './components/ProductSummaryInline'
import ProductSummaryInlinePrice from './components/ProductSummaryInlinePrice'
import displayButtonTypes, {
  getDisplayButtonNames,
  getDisplayButtonValues,
} from './utils/displayButtonTypes'
import { productShape } from './utils/propTypes'

const DISPLAY_MODE_MAP = {
  normal: ProductSummaryNormal,
  small: ProductSummarySmall,
  inline: ProductSummaryInline,
  inlinePrice: ProductSummaryInlinePrice,
}
=======
import ContentLoader from 'react-content-loader'
import { FormattedMessage } from 'react-intl'
import { Link, withRuntimeContext } from 'render'
import classNames from 'classnames'
import BuyButton from 'vtex.store-components/BuyButton'
import CollectionBadges from 'vtex.store-components/CollectionBadges'
import DiscountBadge from 'vtex.store-components/DiscountBadge'
import ProductName from 'vtex.store-components/ProductName'
import ProductPrice from 'vtex.store-components/ProductPrice'
//import AddProduct from 'vtex.wishlist/AddProduct'
import { ExtensionPoint } from 'render'
import { productShape } from './propTypes'
import Image from './components/Image'

import './global.css'
>>>>>>> Wishlist stuff

/**
 * Product Summary component. Summarizes the product information.
 */
class ProductSummary extends Component {
  static propTypes = {
    /** Product that owns the informations */
    product: productShape,
    /** Shows the product list price */
    showListPrice: PropTypes.bool,
    /** Should redirect to checkout after clicking on buy */
    isOneClickBuy: PropTypes.bool,
    /** Set pricing labels' visibility */
    showLabels: PropTypes.bool,
    /** Set installments' visibility */
    showInstallments: PropTypes.bool,
    /** Set the borders product's visibility */
    showBorders: PropTypes.bool,
    /** Set the discount badge's visibility */
    showBadge: PropTypes.bool,
    /** Set the product description visibility */
    showDescription: PropTypes.bool,
    /** Text of selling Price's label */
    labelSellingPrice: PropTypes.string,
    /** Text shown on badge */
    badgeText: PropTypes.string,
    /** Custom buy button text */
    buyButtonText: PropTypes.string,
    /** Defines the display mode of buy button */
    displayBuyButton: PropTypes.oneOf(getDisplayButtonValues()),
    /** Hides the buy button completely . If active, the button will not be shown in any condition */
    hideBuyButton: PropTypes.bool,
    /** Defines if the collection badges are shown */
    showCollections: PropTypes.bool,
    /** Name schema props */
    name: PropTypes.object,
    /** Runtime context */
    runtime: PropTypes.shape({
      hints: PropTypes.shape({
        /** Indicates if is on a mobile device */
        mobile: PropTypes.bool,
      }),
    }),
    /** Display mode of the summary used in the search result */
    displayMode: PropTypes.oneOf(['normal', 'small', 'inline', 'inlinePrice']),
    /** Function that is executed when a product is clicked */
    actionOnClick: PropTypes.func,
  }

  static defaultProps = {
    showListPrice: true,
    showInstallments: true,
    showLabels: true,
    showBadge: true,
    showCollections: false,
    showDescription: false,
    displayBuyButton: displayButtonTypes.DISPLAY_ALWAYS.value,
    isOneClickBuy: false,
    name: {
      showProductReference: false,
      showBrandName: false,
      showSku: false,
    },
    displayMode: 'normal',
    showBorders: false,
  }

  state = {
    isHovering: false,
    isUpdatingItems: false,
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  handleItemsStateUpdate = isLoading =>
    this.setState({ isUpdatingItems: isLoading })

  render() {
    const {
      product,
      actionOnClick,
      displayMode,
      displayBuyButton,
      isOneClickBuy,
      buyButtonText,
      showBorders,
      showDescription,
      runtime,
      showBadge,
      badgeText,
      showCollections,
      showListPrice,
      showLabels,
      showInstallments,
      labelSellingPrice,
      name: showFieldsProps,
    } = this.props

    const imageProps = { product, showBadge, badgeText, showCollections }
    const nameProps = { product, showFieldsProps }

    const priceProps = {
      product,
      showListPrice,
      showLabels,
      showInstallments,
      labelSellingPrice,
      isLoading: this.state.isUpdatingItems,
    }

    const buyButtonProps = {
      product,
      displayBuyButton,
      isOneClickBuy,
      buyButtonText,
      runtime,
      isHovering: this.state.isHovering,
    }

<<<<<<< HEAD
    const ProductSummaryComponent =
      DISPLAY_MODE_MAP[displayMode] || ProductSummaryNormal
    return (
      <ProductSummaryComponent
        product={product}
        showBorders={showBorders}
        showDescription={showDescription}
        handleMouseEnter={this.handleMouseEnter}
        handleMouseLeave={this.handleMouseLeave}
        handleItemsStateUpdate={this.handleItemsStateUpdate}
        actionOnClick={actionOnClick}
        imageProps={imageProps}
        nameProps={nameProps}
        priceProps={priceProps}
        buyButtonProps={buyButtonProps}
      />
=======
    console.log(product)

    return (
      <div
        className={classes}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <ExtensionPoint id="heart" skuId={path(['sku', 'itemId'], product)} productId={path(['productId'], product)}/>
        <div className="pointer pa2">
          <Link
            className={linkClasses}
            page={'store/product'}
            params={{ slug: path(['linkText'], product) }}
          >
            <div className={imageContainerClasses}>
              {path(['sku', 'image', 'imageUrl'], product)
                ? this.renderImage()
                : this.renderImageLoader()}
            </div>
            <div className={informationClasses}>
              <div className={nameClasses}>
                <ProductName
                  name={path(['productName'], product)}
                  skuName={path(['sku', 'name'], product)}
                  brandName={path(['brand'], product)}
                  {...this.props.name}
                />
              </div>
              <div className={priceClasses}>
                <ProductPrice
                  listPrice={path(['ListPrice'], this.commertialOffer)}
                  sellingPrice={path(['Price'], this.commertialOffer)}
                  installments={path(['Installments'], this.commertialOffer)}
                  showListPrice={showListPrice}
                  showLabels={showLabels}
                  showInstallments={showInstallments}
                />
              </div>
            </div>
          </Link>
          <div className={buyButtonClasses}>
            {showButtonOnHover ||
              (showBuyButton && (
                <div className="vtex-product-summary__buy-button center mw-100">
                  {showBuyButton && (
                    <BuyButton
                      available={isAvailable}
                      skuItems={
                        path(['sku', 'itemId'], product) && [
                          {
                            skuId: path(['sku', 'itemId'], product),
                            quantity: 1,
                            seller: path(['sku', 'seller', 'sellerId'], product)
                          }
                        ]
                      }
                      isOneClickBuy={isOneClickBuy}
                    >
                      {buyButtonText || <FormattedMessage id="button-label" />}
                    </BuyButton>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
>>>>>>> Wishlist stuff
    )
  }
}

const defaultSchema = {
  title: 'editor.productSummary.title',
  description: 'editor.productSummary.description',
  type: 'object',
  properties: {
    isOneClickBuy: {
      type: 'boolean',
      title: 'editor.productSummary.isOneClickBuy.title',
      default: false,
      isLayout: true,
    },
    showBadge: {
      type: 'boolean',
      title: 'editor.productSummary.showBadge.title',
      default: true,
      isLayout: true,
    },
    badgeText: {
      type: 'string',
      title: 'editor.productSummary.badgeText.title',
      isLayout: false,
    },
    buyButtonText: {
      type: 'string',
      title: 'editor.productSummary.buyButtonText.title',
      isLayout: false,
    },
    displayBuyButton: {
      title: 'editor.productSummary.displayBuyButton.title',
      type: 'string',
      enum: getDisplayButtonValues(),
      enumNames: getDisplayButtonNames(),
      default: displayButtonTypes.DISPLAY_ALWAYS.value,
      isLayout: true,
    },
    showCollections: {
      type: 'boolean',
      title: 'editor.productSummary.showCollections.title',
      default: false,
      isLayout: true,
    },
    ...ProductPrice.schema.properties,
  },
}

ProductSummary.getSchema = () => {
  const nameSchema = ProductName.schema
  return {
    ...defaultSchema,
    properties: {
      ...defaultSchema.properties,
      name: nameSchema,
    },
  }
}

export default withRuntimeContext(ProductSummary)