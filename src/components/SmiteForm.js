import React from 'react'
import { useForm } from 'react-hook-form'

const SmiteForm = () => {
  
  const {register, handleSubmit, formState: {errors}} = useForm()

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <div className="item">
        <label forhtml="swordDamage">Sword Damage</label>
        <input 
          {...register("swordDamage", {
            required: "Sword damage is required.",
            pattern: {
              value: /^[0-9]+$/,
              message: "The damage should be in the same format as 1d8+1."
            }
          })}
          type="text" 
          placeholder='1d8'
        />
        {errors.swordDamage && (
          <small className="text-danger">{errors.swordDamage.message}</small>
        )}
      </div>
      <div className="item">
        <label forhtml="smite-level-label">Smite Level</label>
        <select
          label="smite-level-label"
          {...register("smiteLevel")}
        >
        <option value={0}>None</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      </div>

      <div className="item">
        <label forhtml="special-label">Fiend/Undead</label>
        <input {...register("special")} type="checkbox" label="special-label"/>
      </div>

      <div className="item">
        <label forhtml="critical-label">Critical Hit</label>
        <input {...register("critical")} type="checkbox" label="critical-label"/>
      </div>
      <button>Roll Damage</button>

    </form>
  )
}

export default SmiteForm