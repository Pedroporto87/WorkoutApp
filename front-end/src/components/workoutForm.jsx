import '../styles/workoutForm.scss'
import { useState } from 'react'

export const workoutForm = () => {
    const [form, setForm] = useState({
        carga:'',
        serie:'',
        reps:'',
        descanso:'', 
    })

  return (
    <section>
        <form action="" className="create">
            
        </form>
    </section>
  )
}
