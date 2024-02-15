import PropTypes from 'prop-types'
import '../styles/components/workoutDetails.scss'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchApiData } from '../features/getWorkout/getWorkoutSlide';
import { WorkoutItem } from './workoutTable';
import { SeriesTabs } from './SeriesTabs';


export const WorkoutList = () => {
  const [editedValues, setEditedValues] = useState({});
  const dispatch = useDispatch();
  const data = useSelector((state) => state.workout.data);
  const [selectedSerieId, setSelectedSerieId] = useState(null);

  const handleSerieSelected = (id) => {
      setSelectedSerieId(id);
  };
  

  useEffect(() => {
    dispatch(fetchApiData());
  }, [dispatch]);

  const handleInputChange = (field, value) => {
    // Atualiza os valores editados no estado local
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };




  return (
  <>
      <section className='table-conteiner'>
      <SeriesTabs onSerieSelected={handleSerieSelected} />
      <table>
        <thead>
          <tr>
            <th>Exercicio</th>
            <th>Carga(kg)</th>
            <th>Reps</th>
            <th>Series</th>
            <th>Descanso(seg)</th>
            <th>Criado em</th>
            <th>Ações </th>
          </tr>
        </thead>
      <tbody>
        
        {data.map((workout) => (
          <tr key={workout._id}>
            <WorkoutItem
              id={workout._id}
              key={workout._id}
              workout={workout}
              onInputChange={handleInputChange}
            />
            </tr>
            ))}
            </tbody>
            </table>
        </section>
    </>
    )
  
}






WorkoutList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      carga: PropTypes.string.isRequired,
      reps: PropTypes.string.isRequired,
      series: PropTypes.number.isRequired,
      descanso: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};




