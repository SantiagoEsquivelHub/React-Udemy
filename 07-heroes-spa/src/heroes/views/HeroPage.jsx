import { useParams, Navigate } from 'react-router-dom'
import { getHeroeById } from '../helpers';

export const HeroPage = () => {

  const { id } = useParams();

  const heroe = getHeroeById(id);

  if (!heroe) {
    return <Navigate to="/marvel"/>
  }

  return (
    <div>
      <h1>HeroPage</h1>
      <hr />
    </div>
  )
}
