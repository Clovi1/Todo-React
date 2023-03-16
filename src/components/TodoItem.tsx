import React, {FC, useState} from 'react';
import {ITodo} from "../models/models";
import delete_button from '../assets/delete_button.svg'
import check_mark from '../assets/check_mark.svg'
import {useDebounce} from "../hooks/debounce";
import useDidMountEffect from "../hooks/didMount";
import {observer} from "mobx-react";
import {todosStore} from "../store";

interface TodoItemProps {
    todo: ITodo,
}

const TodoItem: FC<TodoItemProps> = ({todo}) => {
    const [value, setValue] = useState(todo.title)
    const [isHovered, setIsHovered] = useState(false)
    const debounce = useDebounce(value)
    const handleUpdate = async () => {
        await todosStore.updateTodo({...todo, completed: !todo.completed})
    }

    const handleUpdateTodo = (value: string) => {
        setValue(value)
    }

    useDidMountEffect(() => {
        todosStore.updateTodo({...todo, title: debounce})
    }, [debounce])

    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
             className='p-1.5 flex items-center text-white'>
            {todo.completed ?
                <div
                    className='w-7 h-7 mx-2 flex justify-center items-center rounded-full cursor-pointer transition-all
                    hover:bg-neutral-700 '
                    onClick={handleUpdate}>
                    <img className='w-3.5' src={check_mark} alt="delete"/>
                </div>
                :
                <div
                    className='w-7 h-7 mx-2 mx-3 flex justify-center items-center rounded-full cursor-pointer
                    transition-all hover:bg-neutral-700 '
                    onClick={handleUpdate}>
                    <div className="w-4 h-4 border-2 rounded-full border-white "></div>
                </div>
            }

            <input className={'bg-transparent outline-none'} autoFocus={!todo.title?.length}
                   onChange={(e) => handleUpdateTodo(e.target.value)}
                   type="text" value={value}/>
            {isHovered &&
                <img className='w-3.5 ml-3 cursor-pointer opacity-50 transition-all hover:opacity-100'
                     onClick={() => todosStore.removeTodo(todo.id)}
                     src={delete_button} alt="delete"/>
            }
        </div>
    );
};

export default observer(TodoItem);