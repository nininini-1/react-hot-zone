import logo from './logo.jpg';
import React from 'react'

import MultiCrops from './components/MultiCrops'
import { nanoid } from 'nanoid';

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
       <MultiCrops
        src={logo}
        width={600}
        coordinates={this.state.coordinates}
        onChange={this.changeCoordinate}
        onDelete={this.deleteCoordinate}
        ondblClick={(e)=> {
          console.log(e,"双击了")
        }}
      />
      <button onClick={()=> {
        const newCoordinate = {
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          id: nanoid()
        }
        const newCoordinates = coordinates;
        newCoordinates.push(newCoordinate)
        this.setState({
          coordinates: newCoordinates
        })
      }}>添加</button>
      </div>
    );
  }

}

export default App;
