import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateWorkout } from '../features/getWorkout/getWorkoutSlide'


export const EditCard = ({id,  onClose=()=>{}}) => {
    const [form, setForm] = useState({
        title:'',
        carga:'',
        series:'',
        reps:'',
        descanso:''        
    })        
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevData) => ({...prevData, [name]: value}))

    const onEdit = () => {
        dispatch(updateWorkout(...form, id))
        CloseModal()
    }

    function CloseModal(){
         onClose()
    }

  return (
    <div className='edit-card' id={data.id} >
        <div className='edit-card-conteiner' >
            <h1>Editar Exercicio</h1>
            <label>Nome do Exercicio:
            <input 
                required
                type='text'
                name='title'
                placeholder='Exercicio'
                value={form.title}
                onChange={(handleChange)}
            >
            </input>
         </label>
         <label>Carga:
            <input 
                required
                type='text'
                name='carga'
                placeholder='Qual carga?'
                value={form.carga}
                onChange={(handleChange)}
            >
            </input>
         </label>
         <label>Serie:
            <input 
                required
                type='text'
                name='series'
                placeholder='Quantas series?'
                value={form.series}
                onChange={(handleChange)}
            >
            </input>
         </label>
         <label>Repetições:
            <input 
                required
                type='text'
                name='reps'
                placeholder='Quantas Repetições?'
                value={form.reps}
                onChange={(handleChange)}
            >
            </input>
         </label>
         <label>Descanso(em seg):
            <input 
                required
                type='text'
                name='descanso'
                placeholder='Descansa quanto?'
                value={form.descanso}
                onChange={(handleChange)}
            >
            </input>
         </label>
            
            <div className='edit-card-buttons'>
                <button className='edit-cancel-button' onClick={CloseModal}>Cancel</button>
                <button className='edit-save-button'type='submit' onClick={() => onEdit(data)}>Save</button>
            </div>
        </div>
    </div>
  )
}}