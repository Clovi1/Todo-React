import React, {FC, useState} from 'react';
import {ITodo} from "../models/models";
import delete_button from '../assets/delete_button.svg'
import check_mark from '../assets/check_mark.svg'
import {useDebounce} from "../hooks/debounce";
import useDidMountEffect from "../hooks/didMount";

interface TodoItemProps {
    todo: ITodo,
    update: (todo: ITodo) => void,
    remove: (id: number) => void,
}

const TodoItem: FC<TodoItemProps> = ({todo, update, remove}) => {
    const [value, setValue] = useState(todo.title)
    const [isHovered, setIsHovered] = useState(false)
    const debounce = useDebounce(value)
    const handleUpdate = async () => {
        await update({...todo, completed: !todo.completed})
    }

    const handleUpdateTodo = (value: string) => {
        setValue(value)
    }

    useDidMountEffect(() => {
        (async function fetchData() {
            await update({...todo, title: debounce})
        }())
    }, [debounce])

    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
             className='flex items-center p-1.5 text-white'>
            {todo.completed ?
                <div
                    className='w-7 h-7 mx-2 rounded-full cursor-pointer transition-all hover:bg-neutral-700 flex justify-center items-center'
                    onClick={handleUpdate}>
                    <img className='w-3.5' src={check_mark} alt="delete"/>
                </div>
                :
                <div
                    className='w-7 h-7 mx-2 mx-3 rounded-full cursor-pointer transition-all hover:bg-neutral-700 flex justify-center items-center'
                    onClick={handleUpdate}>
                    <div className="w-4 h-4 border-2 rounded-full border-white ">
                    </div>
                </div>
            }
            <input className={'bg-transparent outline-none'} autoFocus={!todo.title?.length}
                   onChange={(e) => handleUpdateTodo(e.target.value)}
                   type="text" value={value}/>
            {isHovered &&
                <img className='w-3.5 ml-3 cursor-pointer opacity-50 transition-all hover:opacity-100'
                     onClick={() => remove(todo.id)}
                     src={delete_button} alt="delete"/>
            }
        </div>
    );
};

export default TodoItem;