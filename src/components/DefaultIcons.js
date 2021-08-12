import React from 'react'
import Protypes from 'prop-types'

const style = {
  backgroundColor:"#ccc",
  height:18,
  width:18,
  textAlign:"center",
  fontSize: 14,
}

export const DefaultDeleteIcon = props => (
  <div
    style={{
      float: "right",
      cursor: 'pointer',
      ...style,
    }}
    {...props}
  >
    x
  </div>

)

export const DefaultNumberIcon = ({ number }) => (
  <div style={{
    float:'left',
    ...style,
  }}>
    {number}
  </div>
)

const { number } = Protypes

DefaultNumberIcon.propTypes = {
  number,
}

DefaultNumberIcon.defaultProps = {
  number: '',
}

