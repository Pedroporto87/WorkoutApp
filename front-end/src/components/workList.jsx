import PropTypes from 'prop-types'
import '../styles/workoutDetails.scss'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchApiData } from '../features/getWorkout/getWorkoutSlide';
import { MdDeleteForever, MdOutlineEditNote } from "react-icons/md";
import moment from 'moment'
import 'moment/locale/pt-br'
import { EditCard } from './EditCard';
import { DeleteCard } from './DeleteCard';

export const WorkoutList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.workout.data);
  const [isEditing, setIsEditing] = useState({});


  useEffect(() => {
    dispatch(fetchApiData());
  }, [dispatch]);

  const handleEditClick = (workoutId) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [workoutId]: !prevState[workoutId],
    }));
  };

  const handleSaveClick = (workout) => {
    // Atualize o treino com os dados editados
    dispatch(updateWorkout(workout));
    // Desative o modo de edição
    setIsEditing((prevState) => ({
      ...prevState,
      [workout.id]: false,
    }));
  };


  return (
    <>
   {data.map((workout) => (
        <section className='workout' key={workout.id}>
          <h4>{workout.title}</h4>
          <p><strong>Carga(kg):</strong> {isEditing[workout.id] ? (
              <input
                type='text'
                value={workout.carga}
                onChange={(e) => handleEditChange(e, workout)}
              />
            ) : (
              workout.carga
            )}</p>
          <p><strong>Reps:</strong>{isEditing[workout.id] ? (
              <input
                type='text'
                value={workout.reps}
                onChange={(e) => handleEditChange(e, workout)}
              />
            ) : (
              workout.reps
            )}</p>
          <p><strong>Series:</strong>{isEditing[workout.id] ? (
              <input
                type='text'
                value={workout.series}
                onChange={(e) => handleEditChange(e, workout)}
              />
            ) : (
              workout.series
            )}</p>
          <p><strong>Descanso(em seg):</strong>{isEditing[workout.id] ? (
              <input
                type='text'
                value={workout.descanso}
                onChange={(e) => handleEditChange(e, workout)}
              />
            ) : (
              workout.descanso
            )}</p>
          <p>{moment(workout.createdAt).locale('pt-br').fromNow()}</p>
          <section className='edit-card-icons'>
          <section className='edit-card-icons'>
            {isEditing[workout.id] ? (
              <button onClick={() => handleSaveClick(workout)}>OK</button>
            ) : (
              <button onClick={() => handleEditClick(workout.id)}>Editar</button>
            )}
          </section>
            <MdDeleteForever 
              onClick={() => {setOpenDeleteModal(true)}}/>
            
          </section>
        </section>
      ))}
    </>
  );
}

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

  
  
  
  