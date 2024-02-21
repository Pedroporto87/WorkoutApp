import { WorkoutDetails } from '../components/workoutDetails'
import '../styles/components/home.scss'


export const AlunoDashBoard = () => {
  return (
    <section className='home'>
      <section className='workout-home'>
        <section className='details'>
          <WorkoutDetails />  
        </section> 
      </section>
    </section>
  )
}
