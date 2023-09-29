import React from 'react'
import { useState } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { EditCard } from './EditCard'

export const DeleteWorkoutButtom = ({id}) => {
  const [open, setOpen] = useState(false)

  const showModal = () => {setOpen((prev) => !prev)}
  return (  
    <div>
        <MdDeleteForever className='edit-button' onClick={showModal} />
        {open ? (<EditCard onClose={() => setOpen(false)} id={id} />):''}
    </div> 
  )
}
