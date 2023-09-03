import PropTypes from 'prop-types'
import '../styles/workoutDetails.scss'

export const WorkoutDetails = ({ data }) => {
  return (
    <section className='workout'>
        <h4>{data.title}</h4>
        <p><strong>Carga(kg):</strong> {data.carga}</p>
        <p><strong>Reps:</strong> {data.reps}</p>
        <p><strong>Series:</strong> {data.series}</p>
        <p><strong>Descanso(em seg):</strong>{data.descanso}</p>
        <p>{data.createdAt}</p>        
    </section>
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
