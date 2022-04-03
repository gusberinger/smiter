import React, {useState} from 'react'
import SmiteForm from './SmiteForm'

const Smite = (props) => {
  
  const handleSubmit = e => {
    e.preventdefault()
    const data = e.target
    console.log(data)
  }

  return (
    <SmiteForm onSubmit={handleSubmit}></SmiteForm>
  )
}

export default Smite