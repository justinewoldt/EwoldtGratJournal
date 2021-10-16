import { useState } from 'react'
export default function Input( handleSubmit ) {
  return(
    <form onSubmit = {(e) => handleSubmit(value)}>
      <input type="text" value={value} onChange={e => setValue(e.target.value)}
      className="rounded px-3 py-2">

      </input>
      <button type = "submit" className="">
    <p>This is the input form</p>
    </form>
  )
}
