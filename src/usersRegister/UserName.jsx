import React, { useEffect, useState } from 'react'
import { InputComp } from '../components/Index.jsx'

function UserName({userName,setUserName,myStyle,className}) {
   const label='Enter The UserName: ';
  //  console.log(myStyle)

  return (
    <div style={myStyle} className={className}>
        <InputComp label={label}
           value={userName}
           setValue={setUserName}
           
        ></InputComp>
        <p>UserName You Entered: {userName} </p>

    </div>
  )
}

export default UserName