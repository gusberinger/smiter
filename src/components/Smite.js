import React, {useState} from 'react'
import SmiteForm from './SmiteForm'

const diceRegex = /^(\d{1,2})d(\d{1,2})(\+\d+)?$/

const getRandomInt = max => {
  return Math.floor(Math.random() * max) + 1
}

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

const rollDice = (totalDice, sides, bonus) => {
  let total = bonus
  for (let i = 0; i < totalDice; i++) {
    total += getRandomInt(sides)
  }
  return total
}

const rollDamage = (sword, smiteLevel, special, criticalHit, improved, holy) => {
  let smiteDice = 0
  let swordDice = sword.totalDice
  let holyDice = 0
  if (smiteLevel > 0) {
    smiteDice = Math.min(1 + smiteLevel, 5) // 1st level smite is 2d8, capped at 5d8
  }
  if (special)
    smiteDice++ // if fiend or undead, can go beyond 5d8
  if (improved) {
    smiteDice++;
  }
  if (holy && special) {
    holyDice = 2
  }
  if (criticalHit) {
    smiteDice *= 2
    swordDice *= 2
    holyDice *= 2
  }
  const swordDamage = rollDice(swordDice, sword.sides, sword.bonus)
  const smiteDamage = rollDice(smiteDice, 8, 0)
  const holyDamage = rollDice(holyDice, 10, 0)
  const swordText = `${swordDice}d${sword.sides}`
  const smiteText = `${smiteDice}d8`
  const holyText = `${holyDice}d10`

  return {
    swordDamage: swordDamage,
    smiteDamage: smiteDamage,
    holyDamage: holyDamage,
    swordText: swordText,
    smiteText: smiteText,
    holyText: holyText
  }

} 


const Smite = () => {
  const [results, setResults] = useState(null)

  const childToParent = (childData) => {
    console.log(childData)
    const sword = parseString(childData.swordDamage)
    const damage = rollDamage(sword, childData.smiteLevel, childData.special, 
                              childData.critical, childData.improved, childData.holy)
    console.log(damage)
    setResults(damage)
  }

  return (
    <>
    <SmiteForm childToParent={childToParent}></SmiteForm>
    <div>
      
      {(results) && 
        <div>
          {/* <hr/> */}
          <p>
            <i>Sword Damage ({results.swordText}): </i> {results.swordDamage}
          </p>
          { (results.smiteDamage > 0) &&
          <>
          <p>
            <i>Radiant Damage ({results.smiteText}): </i> {results.smiteDamage}
          </p>
          <hr/>
          <p>
            <i>Total Damage: </i> {results.swordDamage + results.smiteDamage + results.holyDamage}
          </p>
          </>
          }
        </div>
      }
      </div>
    </>
  )
}

export default Smite