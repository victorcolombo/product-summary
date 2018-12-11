import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { withRuntimeContext } from 'render'

import image from './Image.css'

/** Image component with 1:1 aspect ratio */
const Image = ({ alt, src, className, runtime: { hints: { amp } } }) => {
  const imageClasses = `${image.img} v-mid`
  let img

  if (amp) {
    img = (
      <amp-img
        layout="responsive"
        class={imageClasses}
        src={src}
        alt={alt}
        width="273"
        height="273"
      />
    )
  } else {
    img = <img className={imageClasses} src={src} alt={alt} />
  }

  return (
    <div className={classNames(className, 'w-100')}>
      {img}
    </div>
  )
}

Image.propTypes = {
  /** Image url */
  src: PropTypes.string.isRequired,
  /** Image alt */
  alt: PropTypes.string.isRequired,
  /** Custom classes */
  className: PropTypes.string,
  /** Runtime context */
  runtime: PropTypes.object.isRequired,
}

export default withRuntimeContext(Image)
