import React from 'react'; 
import DroneList from "./DroneList" 

const PilotDetail = props => {
   let details; 
   if( Object.keys(props.pilot).length === 0){
      //empty pilot -- no data
      details = (
      <>
         <p> Please Select a Pilot </p>
      </>
      )
   } else {
      details = (
      <>
         <h3> {props.pilot.name}</h3>
         <h4> Call Sign:{""} {props.pilot.callSign}</h4>
         <DroneList drones={props.pilot.drones} />
      </> 
      )
   }
   return (
      <div className="PilotDetail">
         {details}
      </div>
   )
}



export default PilotDetail