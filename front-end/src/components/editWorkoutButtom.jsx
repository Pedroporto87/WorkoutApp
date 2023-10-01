import React from 'react'
import { useState } from 'react'
import { MdOutlineEditNote } from "react-icons/md";
import { EditCard } from './EditCard'

export const EditWorkoutButtom = ({data}) => {
  const [open, setOpen] = useState(false)

  const showModal = () => {setOpen((prev) => !prev)}
  return (  
    <div>
        <MdOutlineEditNote className='edit-button' onClick={showModal}/>
        {open ? (<EditCard onClose={() => setOpen(false)} data={data} />):''}
    </div> 
  )
}
