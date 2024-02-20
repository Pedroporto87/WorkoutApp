import  { useState } from 'react';
import { MdOutlineEditNote, MdDeleteForever, MdDone, MdCancel } from "react-icons/md";
import { useDeleteWorkoutMutation, useUpdateWorkoutMutation } from '../features/workoutApiSlide';
import '../styles/components/workoutDetails.scss'
import moment from 'moment';

export const WorkoutItem = ({ workout, refetch }) => {
  const [editedValues, setEditedValues] = useState({
    carga: workout.carga,
    reps: workout.reps,
    series: workout.series,
    descanso: workout.descanso,
  });
  const [editingWorkoutId, setEditingWorkoutId] = useState(false);
  const [updateWorkout] = useUpdateWorkoutMutation();
  const [deleteWorkout] = useDeleteWorkoutMutation();
  moment.locale('pt-br');


  const handleEditClick = () => {
    setEditingWorkoutId(true);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteWorkout({ id: workout.id });
      refetch()
    } catch (error) {
      console.error("Erro ao deletar o treino", error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handlePatchClick = async () => {
    try {
      await updateWorkout({ id: workout.id, ...editedValues });
      refetch()
      setEditingWorkoutId(false);
    } catch (error) {
      console.error("Erro ao atualizar o treino", error);
    }
  };

  const handleCancelClick = () => {
    setEditingWorkoutId(false);
  };

  return (
    <tr>
      <td>{workout.title}</td>
      <td>
        {editingWorkoutId ? (
          <input
            type="text"
            value={editedValues.carga}
            onChange={(e) => handleInputChange('carga', e.target.value)}
          />
        ) : (
          workout.carga
        )}
      </td>
      <td>
        {editingWorkoutId ? (
          <input
            type="text"
            value={editedValues.reps}
            onChange={(e) => handleInputChange('reps', e.target.value)}
          />
        ) : (
          workout.reps
        )}
      </td>
      <td>
        {editingWorkoutId ? (
          <input
            type="text"
            value={editedValues.series}
            onChange={(e) => handleInputChange('series', e.target.value)}
          />
        ) : (
          workout.series
        )}
      </td>
      <td>
        {editingWorkoutId ? (
          <input
            type="text"
            value={editedValues.descanso}
            onChange={(e) => handleInputChange('descanso', e.target.value)}
          />
        ) : (
          workout.descanso
        )}
      </td>
      <td>{moment(workout.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
      <td className='edit-card-icons'>
        {editingWorkoutId ? (
          <>
            <MdDone className='ok-button' onClick={handlePatchClick} />
            <MdCancel className='cancel-button' onClick={handleCancelClick} />
          </>
        ) : (
          <>
            <MdOutlineEditNote className='edit-button' onClick={handleEditClick} />
            <MdDeleteForever className='delete-button' onClick={handleDeleteClick} />
          </>
        )}
      </td>
    </tr>
  );
};

 
  