import React, { Component } from 'react';
import PilotList from "./PilotList"

import PilotDetail from "./PilotDetail"
import './App.css';
import axios from "axios"

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pilots: [],
      currentPilot: {},
      currentDrone: {},
      loading: false 
    }
    this.selectPilot = this.selectPilot.bind(this) 
  }

  selectPilot(pilotId){
    console.log("clicking")
    axios.get(`/api/pilots/${pilotId}`)
      .then(res => {
        this.setState({
          currentPilot: res.data 
      })
    })
  }

  selectDrone(done){
    console.log("drone detail click")
    this.setState({
      currentDrone: drones
    })
  }




  componentDidMount(){
    axios.get("/api/pilots")
    .then(res => {
      this.setState({
        pilots: res.data 
      })
    })
  }

  render() {
      return (
      <div className="App">
          <PilotList pilots={this.state.pilots} selectPilot={this.selectPilot}/> 
          <PilotDetail pilot={this.state.currentPilot} />

      </div>
    )
  }
}

export default App;
