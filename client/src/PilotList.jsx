	import React from 'react';

	const PilotList = props => {
		let pilots; 
		if (props.pilots.length) {
			pilots = props.pilots.map((pilot, index) => {
				return <p onClick={() => props.selectPilot(pilot._id)} className="pilotrow" key={index}> {pilot.name} </p>
			})
		} else {
			// No Data Yet 
			pilots = <p> No Pilot  Data </p>
		}
		return (
			<div className="PilotList">
				<h3> Pilots </h3>
				{pilots}
			</div>
		)
	}









export default PilotList