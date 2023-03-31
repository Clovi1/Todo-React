import React, {FC, useState} from 'react';
import delete_button from '../assets/delete_button.svg'
import check_mark from '../assets/check_mark.svg'
import {useDebounce} from "../hooks/debounce";
import useDidMountEffect from "../hooks/didMount";
import {observer} from "mobx-react";
import {ITodoModel} from "../mst/interfaces";
import {useRootStore} from "../mst/store/RootStore.store";

interface TodoItemProps {
    todo: ITodoModel,
}

const TodoItem: FC<TodoItemProps> = ({todo}) => {
    const [value, setValue] = useState(todo.title)
    const [isHovered, setIsHovered] = useState(false)
    const debounce = useDebounce(value)

    const {removeTodo} = useRootStore()

    const handleToggle = () => {
        todo?.toggle();
    }

    const handleUpdateTodo = (value: string) => {
        setValue(value)
    }

    useDidMountEffect(() => {
        todo?.setTitle(debounce);
    }, [debounce])

    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
             className='p-1.5 flex items-center text-white'>
            {todo.completed ?
                <div
                    className='w-7 h-7 mx-2 flex justify-center items-center rounded-full cursor-pointer transition-all
                    hover:bg-neutral-700 '
                    onClick={handleToggle}>
                    <img className='w-3.5' src={check_mark} alt="delete"/>
                </div>
                :
                <div
                    className='w-7 h-7 mx-2 mx-3 flex justify-center items-center rounded-full cursor-pointer
                    transition-all hover:bg-neutral-700 '
                    onClick={handleToggle}>
                    <div className="w-4 h-4 border-2 rounded-full border-white "></div>
                </div>
            }

            <input className={'bg-transparent outline-none'} autoFocus={!todo.title?.length}
                   onChange={(e) => handleUpdateTodo(e.target.value)}
                   type="text" value={value}/>
            {isHovered &&
                <img className='w-3.5 ml-3 cursor-pointer opacity-50 transition-all hover:opacity-100'
                     onClick={() => removeTodo(todo.id)}
                     src={delete_button} alt="delete"/>
            }
        </div>
    );
};

export default observer(TodoItem);