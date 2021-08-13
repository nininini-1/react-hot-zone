# react-hot-zone

### Usage
```js
import logo from './logo.jpg';
import React from 'react'
import CropsGroup from './components/CropsGroup'

class App extends React.Component  {
  state = {
    coordinates: [],
  }

  changeCoordinate = (coordinate, index, coordinates) => {
    this.setState({
      coordinates,
    })
  }
  deleteCoordinate = (coordinate, index, coordinates) => {
    this.setState({
      coordinates,
    })
  }
  render() {
    const {coordinates}=this.state
    return (
      <div className="App">
       <CropsGroup
        src={logo}
        width={600}
        coordinates={this.state.coordinates}
        onChange={this.changeCoordinate}
        onDelete={this.deleteCoordinate}
        ondblClick={(e)=> {
          console.log(e,"双击了")
        }}
      />
      </div>
    );
  }

}

```

### Props

Prop | Description | Type | Default | option
 -- | -- | -- | -- | --
src | Src of background image. | string | - | required
coordinates	| An array of coordinate( see the table blew), {id, x, y, width, height}.	| array	| [] | - 
width	| Width of background image. | number(in pixel)	| - | -
height | Height of background image. | number(in pixel)	- | -
onDraw |	A callback which hanppends when a user starts drawing a new rectangle. | funtion(coordinate , index, coordinates)	- | -
onDrag |	A callback which hanppends when a user stars draging a exited rectangle. |	funtion(coordinate , index, coordinates)	- | -
onResize |	A callback which hanppends when a user starts resizing a exited rectangle. |	funtion(coordinate , index, coordinates)	- | -
onChange |	A callback which hanppends when a user starts drawing, draging or resizing a new/exited rectangle. |	funtion(coordinate , index, coordinates)	- | -
onDelete |	A callback which hanppends when a user delete a exited rectangle. |	funtion(coordinate , index, coordinates)	- | -
onLoad | The callback is triggered when the background image is loaded. |	onLoad(e)	| - | -
exceedable | Whether to allow more than the background image size | boolean | false | - 
cropItemStyle | corp.style | object | {} | -
bgImgStyle | corp.style | object | {} | - 

#### coordinate
Prop | Description | Type | Default | option
 -- | -- | -- | -- | --
id | Unique between in coordinates array | string | - | -
x	| X coordinate relative to left corner(0,0) of background image. From left to right, x will go up.	| number(in pixel)	| - | - 
x	| Y coordinate relative to left corner(0,0) of background image. From top to bottom, y will go up.	| number(in pixel)	| - | - 
width	| Width of background image. | number(in pixel)	| - | -
height | Height of background image. | number(in pixel)	- | -
