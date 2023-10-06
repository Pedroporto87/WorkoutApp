import PropTypes from 'prop-types'
import '../styles/workoutDetails.scss'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchApiData } from '../features/getWorkout/getWorkoutSlide';

import { WorkoutItem } from './editButtom';



export const WorkoutList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.workout.data);
  
  const [editedValues, setEditedValues] = useState({});

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

  /*const handleSaveClick = (workout) => {
    // Verifica se há valores editados
    if (Object.keys(editedValues).length > 0) {

      dispatch(
        updateWorkout({
          ...workout,
          ...editedValues,
        })
      );
      setEditedValues({});
      setEditingWorkoutId(null);
    }
  };*/

  return (
    <>
      {data.map((workout) => (
        <section >
          <WorkoutItem
            id={workout._id}
            key={workout._id}
            
            workout={workout}
            onInputChange={handleInputChange}
          />
            </section>
          ))}
      </>
  )
};







WorkoutList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      carga: PropTypes.number.isRequired,
      reps: PropTypes.number.isRequired,
      series: PropTypes.number.isRequired,
      descanso: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};




