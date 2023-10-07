import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import { MdOutlineEditNote, MdDeleteForever, MdDone, MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { deleteWorkout } from '../features/getWorkout/getWorkoutSlide';
import { fetchApiData } from '../features/getWorkout/getWorkoutSlide';
import { updateWorkout } from '../features/getWorkout/getWorkoutSlide'
import '../styles/workoutDetails.scss'


export const WorkoutItem = ({workout}) => {
    const [editedValues, setEditedValues] = useState({
      carga: workout.carga,
      reps: workout.reps,
      series: workout.series,
      descanso: workout.descanso,
    });

    const [editingWorkoutId, setEditingWorkoutId] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.workout.data);

    const handleEditClick = () => {
    setEditingWorkoutId(true) 
  };

  const handleDeleteClick = async (id) => { 
    try{
        await dispatch(deleteWorkout(id))
        await dispatch(fetchApiData())
        } catch(error){
        console.log('Erro ao enviar dados:', error);
    }
  };
  const handleCancelClick = () => {
    setEditingWorkoutId(false)
  }
  const handleInputChange = (field, value) => {
    // Atualiza os valores editados no estado local
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };
  
  const handlePatchClick = async() => {
    try {    
      await dispatch(updateWorkout({ id: workout._id, data: editedValues }));
      await dispatch(fetchApiData())
      handleCancelClick()
    } catch (error) {
      console.error('Erro ao atualizar o treino:', error);
    }
  }
  
    return (
     <>
        <td >{workout.title}</td>
        <td >
          {editingWorkoutId === true ? (
            <input
            type="text"
            value={editedValues.carga}
              onChange={(e) => handleInputChange('carga',  e.target.value)}
            />
          ) : (
            workout.carga
          )}
        </td>
        <td>
          {editingWorkoutId === true ? (
            <input
              type="text"
              value={editedValues.reps}
              onChange={(e) => handleInputChange('reps',  e.target.value)}
            />
          ) : (
            workout.reps
          )}
        </td>
        <td>
          {editingWorkoutId === true? (
            <input
            type="text"
            value={editedValues.series}
              onChange={(e) => handleInputChange('series',  e.target.value)}
            />
          ) : (
            workout.series
          )}
        </td>
        <td>
          {editingWorkoutId === true ? (
            <input
              type="text"
              value={editedValues.descanso}
              onChange={(e) => handleInputChange('descanso',  e.target.value)}
            />
          ) : (
            workout.descanso
          )}
        </td>
        <td>{moment(workout.createdAt).locale('pt-br').fromNow()}</td>
        <td className='edit-card-icons'>
        {editingWorkoutId === true ? (
          <>
            <MdDone className='ok-button' onClick={() => handlePatchClick(workout._id)} />
            <MdCancel className='cancel-button' onClick={() => handleCancelClick()} />
          </>
        ) : (
          <>
            <MdOutlineEditNote className='edit-button' onClick={() => handleEditClick()} />
            <MdDeleteForever className='delete-button' onClick={() => handleDeleteClick(workout._id)} />
          </>
        )}  
        </td>
        </>
      
    );
  };
 
  