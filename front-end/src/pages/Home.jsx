import axios from 'axios'
import { useEffect, useState } from 'react'
import { WorkoutDetails } from '../components/workoutDetails'
import '../styles/home.scss'
import { WorkoutForm } from '../components/workoutForm'

export const Home = () => {
  const [data, setData] = useState(null)
  const [refresh, setRefresh] = useState(false)
  
  const getWorkout = () => {
    axios.get(`http://localhost:4000/api/workouts`)
          .then((response) => {
            setData(response.data)
          })
   }
 
  useEffect(() => {
      getWorkout()
  }, [])
  
  useEffect(() => {
    getWorkout()
  }, [refresh])

  
  return (
    <section className='home'>
      <section className='workout-home'>
        <section className='details'>
          {data && data.map((workout) =>
            <WorkoutDetails key={workout._id} data={workout}/>  
          )}
      </section>
      <WorkoutForm className='form' setRefresh={setRefresh}/> 
      </section>
    </section>
  )
}
