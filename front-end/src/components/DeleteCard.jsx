import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteWorkout } from '../features/getWorkout/getWorkoutSlide'

export const DeleteCard = ({id,  onClose=()=>{}}) => {

    const dispatch = useDispatch()
    const onDelete = () => {
        dispatch(deleteWorkout(id))
        CloseModal()
    }

    function CloseModal(){
         onClose()
    }

  return (
    <div className='delete-card' id={data.id} >
        <div className='delete-card-conteiner' >
            <h1>Deletar</h1>
            <p>Tem certeza que você quer deletar esse exercicio?</p>
            <div className='delete-card-buttons'>
                <button className= 'delete-cancel-button' onClick={CloseModal}>Cancelar</button>
                <button className='delete-save-button'type='submit' onClick={onDelete(id)}>Deletar</button>
            </div>
        </div>
    </div>
  )
}