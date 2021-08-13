import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { equals, is, update, remove } from 'ramda'
import interact from 'interactjs'
import { DefaultDeleteIcon, DefaultNumberIcon } from './DefaultIcons'

class CropItem extends Component {
  static cropStyle = ({coordinate,cropItemStyle}) => {
    const {
      x, y, width, height,
    } = coordinate

    return {
      display: 'inline-block',
      position: 'absolute',
      width,
      height,
      top: y,
      left: x,
      boxShadow: '0 0 3px #000',
      backgroundColor: '#8c8c8c',
      opacity: 0.5,
      ...cropItemStyle
    }
  }

  componentDidMount() {
    const {exceedable} = this.props
    const restrictRectToParent = interact.modifiers.restrictRect({
      restriction: 'parent',
    })
    interact(this.crop)
      .draggable({
        modifiers: exceedable?[]:[restrictRectToParent],
      })
      .resizable({
        edges: {
          left: true, right: true, bottom: true, top: true,
        },
        modifiers: exceedable?[]:[restrictRectToParent],
      })
      .on('dragmove', this.handleDragMove)
      .on('resizemove', this.handleResizeMove)
  }

  shouldComponentUpdate(nextProps) {
    return !equals(nextProps.coordinate, this.props.coordinate)
      || (nextProps.index !== this.props.index)
  }

  handleResizeMove = (e) => {
    const {
      index,
      coordinate,
      coordinate: { x, y },
      coordinates,
      onResize,
      onChange,
    } = this.props
    const { width, height } = e.rect
    const { left, top } = e.deltaRect
    const nextCoordinate = {
      ...coordinate, x: x + left, y: y + top, width, height,
    }
    const nextCoordinates = update(index, nextCoordinate)(coordinates)
    if (is(Function, onResize)) {
      onResize(nextCoordinate, index, nextCoordinates)
    }
    if (is(Function, onChange)) {
      onChange(nextCoordinate, index, nextCoordinates)
    }
  }
  handleDragMove = (e) => {
    const {
      index,
      coordinate,
      coordinate: { x, y },
      coordinates,
      onDrag,
      onChange,
    } = this.props
    const { dx, dy } = e
    const nextCoordinate = { ...coordinate, x: x + dx, y: y + dy }
    const nextCoordinates = update(index, nextCoordinate)(coordinates)
    if (is(Function, onDrag)) {
      onDrag(nextCoordinate, index, nextCoordinates)
    }
    if (is(Function, onChange)) {
      onChange(nextCoordinate, index, nextCoordinates)
    }
  }

  handleDelete = () => {
    const {
      index,
      coordinate,
      onDelete,
      coordinates,
    } = this.props
    const nextCoordinates = remove(index, 1)(coordinates)
    if (is(Function, onDelete)) {
      onDelete(coordinate, index, nextCoordinates)
    }
  }

  componentWillUnmount() {
    interact(this.crop)
      .unset()
  }

  render() {
    const { coordinate, index, ondblClick ,DeleteIcon = DefaultDeleteIcon,cropItemStyle} = this.props
    return (
      <div
        style={CropItem.cropStyle({coordinate,cropItemStyle})}
        ref={crop => this.crop = crop}
        onDoubleClick={()=> ondblClick(coordinate)}
      >
        <DefaultNumberIcon number={index + 1} />
        <DeleteIcon
          onClick={this.handleDelete}
        />
      </div>
    )
  }
}

export const coordinateType = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
})

CropItem.propTypes = {
  coordinate: coordinateType.isRequired,
  index: PropTypes.number.isRequired,
  onResize: PropTypes.func, // eslint-disable-line
  onDrag: PropTypes.func, // eslint-disable-line
  onDelete: PropTypes.func, // eslint-disable-line
  onChange: PropTypes.func, // eslint-disable-line
  coordinates: PropTypes.array // eslint-disable-line
}

export default CropItem
