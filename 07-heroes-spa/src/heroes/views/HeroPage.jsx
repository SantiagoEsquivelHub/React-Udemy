import React from 'react'
import { useParams } from 'react-router-dom'

export const HeroPage = () => {

  const params = useParams();
  
  console.log(params);
  return (
    <div>
      <h1>HeroPage</h1>
      <hr />
    </div>
  )
}
