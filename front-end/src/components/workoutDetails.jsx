import PropTypes from 'prop-types'
import '../styles/workoutDetails.scss'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchApiData } from '../features/getWorkout/getWorkoutSlide';''
import moment from 'moment'
import 'moment/locale/pt-br'

export const WorkoutDetails = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.workout.data)

  useEffect(() => {
    dispatch(fetchApiData())
  }, [dispatch])

  moment.locale('pt-br');

  return (
    data.map((workout) => (
      <section className='workout' key={workout.id}>
          <h4>{workout.title}</h4>
          <p><strong>Carga(kg):</strong> {workout.carga}</p>
          <p><strong>Reps:</strong> {workout.reps}</p>
          <p><strong>Series:</strong> {workout.series}</p>
          <p><strong>Descanso(em seg):</strong>{workout.descanso}</p>
          <p>{moment(workout.createdAt).locale('pt-br').fromNow()}</p>        
      </section>
    ))
  )
}

WorkoutDetails.propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string.isRequired,
      carga: PropTypes.number.isRequired,
      reps: PropTypes.number.isRequired,
      series: PropTypes.number.isRequired,
      descanso: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
    }).isRequired,
  };
