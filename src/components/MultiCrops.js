import React, { Component } from 'react'
import { both, clone, is, complement, equals, map, addIndex } from 'ramda'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import CropItem, { coordinateType } from './CropItem'
import logo from '../logo.jpg';

const isValidPoint = (point = {}) => {
  const strictNumber = number => both(
    is(Number),
    complement(equals(NaN)),
  )(number)
  return strictNumber(point.x) && strictNumber(point.y)
}


class MultiCrops extends Component {
  drawingIndex = -1
  pointA = {}
  id = nanoid()
  renderCrops = (props) => {
    const indexedMap = addIndex(map)
    return indexedMap((coor, index) =>
      (<CropItem
        // improve performance when delet crop in middle array
        key={coor.id || index}
        index={index}
        coordinate={coor}
        {...props}
      />))(props.coordinates)
  }

  getCursorPosition = (e) => {
    const { left, top } = this.container.getBoundingClientRect()
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    }
  }

  handleMouseDown = (e) => {
    const { coordinates } = this.props
    if (e.target === this.img || e.target === this.container) {
      const { x, y } = this.getCursorPosition(e)
      this.drawingIndex = coordinates.length
      this.pointA = { x, y }
      this.id = nanoid()
    }
  }

  handleMouseMove = (e) => {
    const { onDraw, onChange, coordinates } = this.props
    const { pointA } = this
    if (isValidPoint(pointA)) {
      const pointB = this.getCursorPosition(e)
      // get the drawing coordinate
      const coordinate = {
        x: Math.min(pointA.x, pointB.x),
        y: Math.min(pointA.y, pointB.y),
        width: Math.abs(pointA.x - pointB.x),
        height: Math.abs(pointA.y - pointB.y),
        id: this.id,
      }
      const nextCoordinates = clone(coordinates)
      nextCoordinates[this.drawingIndex] = coordinate
      if (is(Function, onDraw)) {
        onDraw(coordinate, this.drawingIndex, nextCoordinates)
      }
      if (is(Function, onChange)) {
        onChange(coordinate, this.drawingIndex, nextCoordinates)
      }
    }
  }

  handlMouseUp = () => {
    this.pointA = {}
  }

  render() {
    const {
      src = logo, width = 200, height = 200, onLoad, bgImgStyle
    } = this.props
    return (
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
        }}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handlMouseUp}
        ref={container => this.container = container}
      >
        <img
          ref={img => this.img = img}
          src={src}
          width={width}
          height={height}
          onLoad={onLoad}
          alt=""
          draggable={false}
          style={{...bgImgStyle}}
        />
        {this.renderCrops(this.props)}
      </div>
    )
  }
}

const {
  string, arrayOf, number, func,bool, object
} = PropTypes

MultiCrops.propTypes = {
  coordinates: arrayOf(coordinateType),
  src: string,
  width: number, // eslint-disable-line
  exceedable: bool,
  height: number, // eslint-disable-line
  onDraw: func, // eslint-disable-line
  onChange: func, // eslint-disable-line
  ondblClick: func, // eslint-disable-line
  onLoad: func, // eslint-disable-line
  DeleteIcon: func,
  // 热区样式
  cropItemStyle: object,
  // 背景图片样式
  bgImgStyle: object
}

MultiCrops.defaultProps = {
  coordinates: [],
  width: 200,
  height: 200,
  src: logo,
  exceedable: false
}

export default MultiCrops

