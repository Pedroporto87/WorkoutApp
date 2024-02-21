import { MdDone, MdCancel } from "react-icons/md";
import { useState } from 'react';
import { useAddNewWorkoutMutation } from '../features/workoutApiSlide';
import '../styles/components/workoutForm2.scss'

export const WorkoutForm2 = ({ refetch, setShowAddForm, selectedSerieId}) => {
    const [newWorkout, setNewWorkout] = useState({
        title:"",
        carga:"",
        series:"",
        reps:"",
        descanso:""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewWorkout((prevData) => ({...prevData, [name]: value}))
    }

    const [addNewWorkout] = useAddNewWorkoutMutation();

    const handleAddWorkout = async () => {
      try {
        await addNewWorkout({ ...newWorkout, serieId: selectedSerieId }).unwrap();
        setShowAddForm(false); // Esconde o formulário
        refetch(); // Atualiza a lista de exercícios
      } catch (error) {
        console.error('Erro ao adicionar novo exercício:', error);
      }
    };

  return (
    <>
         <tr>
          <td><input type="text" placeholder="Exercício" name="title" onChange={handleChange} value={newWorkout.title}/></td>
          <td><input type="text" placeholder="Carga" name="carga" onChange={handleChange} value={newWorkout.carga} /></td>
          <td><input type="text" placeholder="Reps" name="reps" onChange={handleChange} value={newWorkout.reps}/></td>
          <td><input type="text" placeholder="Séries" name="series" onChange={handleChange} value={newWorkout.series}/></td>
          <td><input type="text" placeholder="Descanso" name="descanso" onChange={handleChange} value={newWorkout.descanso}/></td>
          <td></td>
          <td>
            <MdDone className='ok-button' onClick={handleAddWorkout} />
            <MdCancel className='cancel-button' onClick={(() => setShowAddForm(false))} />
          </td>
        </tr>
    </>
  )
}
