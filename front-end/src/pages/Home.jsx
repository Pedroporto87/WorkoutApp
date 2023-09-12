import { WorkoutDetails } from '../components/workoutDetails'
import '../styles/home.scss'
import { WorkoutForm } from '../components/workoutForm'

export const Home = () => {
  return (
    <section className='home'>
      <section className='workout-home'>
        <section className='details'>
          <WorkoutDetails />  
        </section>
        <WorkoutForm className='form'/> 
      </section>
    </section>
  )
}
