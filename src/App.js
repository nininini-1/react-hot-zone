import logo from './logo.jpg';
import './App.css';
import React from 'react'

import MultiCrops from './components/MultiCrops'
export { removeid, addid } from './utils'


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
      </div>
    );
  }

}

export default App;
