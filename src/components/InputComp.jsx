import React from 'react'
import './Input.css';

function InputComp({label,value,setValue,type='text',placeholder=label,myClass,styles}) {



  return (
    <div className={'inputContainer'}>
        <label className={'inputAsked'}>
          <strong>{label}    </strong>
        </label>
        <input type={type} 
          value={value} 
          onChange={(e)=>setValue(e.target.value)} 
          placeholder={placeholder}
          className={'inputToType'}
          required
        ></input>

    </div>
  )
}

export default InputComp