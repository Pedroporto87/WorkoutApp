import  { useState } from 'react';
import { MdOutlineEditNote, MdDeleteForever, MdDone, MdCancel } from "react-icons/md";
import { useDeleteWorkoutMutation, useUpdateWorkoutMutation } from '../features/workoutApiSlide';

export const WorkoutItem = ({ workout }) => {
  const [editedValues, setEditedValues] = useState({
    carga: workout.carga,
    reps: workout.reps,
    series: workout.series,
    descanso: workout.descanso,
  });
  const [editingWorkoutId, setEditingWorkoutId] = useState(false);
  const [updateWorkout] = useUpdateWorkoutMutation();
  const [deleteWorkout] = useDeleteWorkoutMutation();

  const handleEditClick = () => {
    setEditingWorkoutId(true);
  };

  const handleDeleteClick = async () => {
    await deleteWorkout(workout.id);
  };

  const handleInputChange = (field, value) => {
    setEditedValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handlePatchClick = async () => {
    await updateWorkout({ id: workout.id, ...editedValues });
    setEditingWorkoutId(false);
  };

  const handleCancelClick = () => {
    setEditingWorkoutId(false);
  };

  return (
    <>
      <td>{workout.title}</td>
      {/* Exemplo para 'carga', repita a lógica para outros campos conforme necessário */}
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
      {/* Ícones de ação */}
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
      {/* Repita a lógica para outros campos e ícones conforme necessário */}
    </>
  );
};
 
  