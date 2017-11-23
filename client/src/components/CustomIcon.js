import React from 'react'

const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => (
  <svg
    className={`am-icon am-icon-${type.default.id} am-icon-${size} ${className}`}
    {...restProps}
    >
    <use xlinkHref={`#${type.default.id}`} />
  </svg>
)

export default CustomIcon
