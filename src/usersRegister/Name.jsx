import React from 'react'
import { InputComp } from '../components/Index.jsx'

function Name({name,setName,myStyle,className}) {
   const label="Enter Your Full Name:"
  return (
    <div style={myStyle} className={className}>
        <InputComp label={label} value={name} setValue={setName}></InputComp>
        <p>Name you Entered: {name} </p>
    </div>
  )
}

export default Name
