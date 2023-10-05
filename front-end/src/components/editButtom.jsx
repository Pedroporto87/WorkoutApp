import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import { EditableInput } from './editableInput'
import { MdOutlineEditNote, MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { deleteWorkout } from '../features/getWorkout/getWorkoutSlide';
import { fetchApiData } from '../features/getWorkout/getWorkoutSlide';


export const WorkoutItem = ({
    workout,
    onInputChange,
  }) => {
    const [editingWorkoutId, setEditingWorkoutId] = useState(null);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.workout.data);

    const handleEditClick = (workoutId) => {
        // Define o ID do exercício que está sendo editado
    setEditingWorkoutId(workoutId) 
  };

  const handleDeleteClick = async (id) => {
    
    try{
        await dispatch(deleteWorkout(id))
        await dispatch(fetchApiData())
        
        } catch(error){
        console.log('Erro ao enviar dados:', error);
    }
    
  };
    return (
      <section className='workout' key={workout.id}>
        <h4>{workout.title}</h4>
        <p>
          <strong>Carga(kg):</strong>{' '}
          {editingWorkoutId === workout.id ? (
            <EditableInput
              data={workout.carga}
              onInputChange={(value) => onInputChange('carga', value)}
            />
          ) : (
            workout.carga
          )}
        </p>
        <p>
          <strong>Reps:</strong>
          {editingWorkoutId === workout.id ? (
            <EditableInput
              data={workout.reps}
              onInputChange={(value) => onInputChange('reps', value)}
            />
          ) : (
            workout.reps
          )}
        </p>
        <p>
          <strong>Series:</strong>
          {editingWorkoutId === workout.id ? (
            <EditableInput
              data={workout.series}
              onInputChange={(value) => onInputChange('series', value)}
            />
          ) : (
            workout.series
          )}
        </p>
        <p>
          <strong>Descanso(em seg):</strong>
          {editingWorkoutId === workout.id ? (
            <EditableInput
              data={workout.descanso}
              onInputChange={(value) => onInputChange('descanso', value)}
            />
          ) : (
            workout.descanso
          )}
        </p>
        <p>{moment(workout.createdAt).locale('pt-br').fromNow()}</p>
        <section className='edit-card-icons'>
            <MdOutlineEditNote onClick={() => handleEditClick()} />
            <MdDeleteForever onClick={() => handleDeleteClick(workout._id)} />      
        </section>
        
      </section>
    );
  };
 
  