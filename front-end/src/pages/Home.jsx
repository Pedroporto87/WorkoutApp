import axios from 'axios'
import { useEffect, useState } from 'react'
import { WorkoutDetails } from '../components/workoutDetails'
import '../styles/home.scss'
import { WorkoutForm } from '../components/workoutForm'

export const Home = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
      axios.get(`http://localhost:4000/api/workouts`)
        .then((response) => {
          setData(response.data)
        })
    
  }, [])
  
  return (
    <section className='home'>
      <section className='workout'>
      {data && data.map((workout) =>
        <WorkoutDetails key={workout._id} data={workout}/>  
      )}
      <WorkoutForm /> 
      </section>
    </section>
  )
}
