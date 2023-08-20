import '../styles/workoutForm.scss'
import { useState } from 'react'
import axios from 'axios'

export const WorkoutForm = () => {
    const [form, setForm] = useState({
        title:'',
        carga:'',
        series:'',
        reps:'',
        descanso:''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevData) => ({...prevData, [name]: value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
             await axios.post(`http://localhost:4000/api/workouts/`, form)
                
            } catch(error){
            console.log('Erro ao enviar dados:', error);
        }

    }

  return (
    <section>
        <form onSubmit={handleSubmit} className="create">
         <h3>Adicione seu exercicio</h3>
         <label htmlFor='title'>Nome do Exercicio:</label>
         <input 
            required
            type='text'
            name='title'
            placeholder='Exercicio'
            value={form.title}
            onChange={(handleChange)}
         >
         </input>
         <label htmlFor='carga'>Carga:</label>
         <input 
            required
            type='text'
            name='carga'
            placeholder='Qual carga?'
            value={form.carga}
            onChange={(handleChange)}
         >
         </input>
         <label htmlFor='serie'>Serie:</label>
         <input 
            required
            type='text'
            name='series'
            placeholder='Quantas series?'
            value={form.series}
            onChange={(handleChange)}
         >
         </input>
         <label htmlFor='reps'>Repetições:</label>
         <input 
            required
            type='text'
            name='reps'
            placeholder='Quantas Repetições?'
            value={form.reps}
            onChange={(handleChange)}
         >
         </input>
         <label htmlFor='descanso'>Descanso(em seg):</label>
         <input 
            required
            type='text'
            name='descanso'
            placeholder='Descansa quanto?'
            value={form.descanso}
            onChange={(handleChange)}
         >
         </input>
         <button 
            type='submit' 
            disabled={!form.title || !form.carga || !form.series || !form.reps || !form.descanso}
            >Adicionar
            </button>
        </form>
    </section>
  )
}
