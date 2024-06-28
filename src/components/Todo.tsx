import React, { useState } from 'react'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa'
import { FaRegEdit } from 'react-icons/fa'
import { TodoType } from '../types/Types'
import { useDispatch } from 'react-redux'
import { deleteTodoById, updateTodo } from '../redux/todoSlice'


interface TodoProps{
  todoProps : TodoType
}

const Todo = ({todoProps}: TodoProps) => {
  const {id,content} = todoProps;

  const dispatch = useDispatch();

  const [editable, setEditable] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>(content);

  
  const handleDeleteTodo = () => {
    dispatch(deleteTodoById(id))
  }

  const handleUpdateTodo = () => {
    const payload :TodoType = {
      id: id,
      content: newTodo
    }
    dispatch(updateTodo(payload))
    setEditable(!editable)
  }

  return (
    <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", border:"1px solid lightgrey",
        padding:"16px", marginTop:"25px", borderRadius:"5px"
    }}>
        {editable ? <input style={{width:"400px", border:"none" , borderBottom:"1px solid lightgrey", outline:"none"}} type="text" value={newTodo} 
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)} /> : <div>{content}</div> }
        <div>
            <IoMdRemoveCircleOutline onClick={handleDeleteTodo} className='icons'/>
            {editable ? <FaCheck onClick={handleUpdateTodo} className='icons'/> : <FaRegEdit onClick={() => setEditable(!editable)} className='icons'/> }
        </div>
    </div>
  )
}

export default Todo