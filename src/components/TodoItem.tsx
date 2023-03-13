import React, {FC, useEffect, useState} from 'react';
import {ITodo} from "../models/models";
import delete_button from '../assets/delete_button.svg'
import {useDebounce} from "../hooks/debounce";

interface TodoItemProps {
    todo: ITodo,
    update: (todo: ITodo) => void,
    remove: (id: number) => void,

}

const TodoItem: FC<TodoItemProps> = ({todo, update, remove}) => {
    const [value, setValue] = useState(todo.title)
    const [isMounting, setIsMounting] = useState(true)
    const debounce = useDebounce(value)
    const handleUpdate = async () => {
        await update({...todo, completed: !todo.completed})
    }

    const handleUpdateTodo = (value: string) => {
        setValue(value)
        // await update({...todo, title: debounce})
    }

    useEffect(() => {
        if (!isMounting) {
            async function fetchData() {
                await update({...todo, title: debounce})
            }

            console.log(debounce)
            fetchData()
        } else {
            setIsMounting(false)
        }
    }, [debounce])

    return (
        <div className='flex justify-around items-center'>
            <input type="checkbox" onClick={handleUpdate} checked={todo.completed}/>
            {todo.id} - <input className={'bg-transparent outline-none'} autoFocus={!todo.title?.length}
                               onChange={(e) => handleUpdateTodo(e.target.value)}
                               type="text" value={value}/>
            <img className='w-5' onClick={() => remove(todo.id)} src={delete_button} alt="delete"/>
        </div>
    );
};

export default TodoItem;