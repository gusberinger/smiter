import { computeHeadingLevel } from '@testing-library/react'
import React, {useState} from 'react'
import SmiteForm from './SmiteForm'

const diceRegex = /^(\d{1,2})d(\d{1,2})(\+\d+)?$/


const parseString = input => {
  const matches = input.match(diceRegex)
  const totalDice = parseInt(matches[1])
  const sides = parseInt(matches[2])
  let bonus = 0;
  if (matches[3] != null) {
    bonus = parseInt(matches[3].slice(1,))
  }
  return {
    totalDice: totalDice,
    sides: sides,
    bonus: bonus
  }

}


const Smite = () => {
  const [data, setData] = useState('')

  const childToParent = (childData) => {
    console.log(childData)
    console.log(parseString(childData.swordDamage))
  }

  return (
    <>
    <SmiteForm childToParent={childToParent}></SmiteForm>
    <div>

    </div>
    </>
  )
}

export default Smite