import { WorkoutDetails } from '../components/workoutDetails'
import '../styles/components/home.scss'
import { WorkoutForm } from '../components/workoutForm'

export const AlunoDashBoard = () => {
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
