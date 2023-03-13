import React, {FC} from 'react';
import {ITodo} from "../models/models";
import delete_button from '../assets/delete_button.svg'

interface TodoItemProps {
    todo: ITodo,
    update: (todo: ITodo) => void,
    remove: (id: number) => void,

}

const TodoItem: FC<TodoItemProps> = ({todo, update, remove}) => {
    const handleUpdate = async () => {
        await update({...todo, completed: !todo.completed} as ITodo)
    }
    return (
        <div className='flex justify-around items-center'>
            <input type="checkbox" onClick={handleUpdate} checked={todo.completed}/> {todo.id} - {todo.title}
            <img className='w-5' onClick={() => remove(todo.id)} src={delete_button} alt="delete"/>
        </div>
    );
};

export default TodoItem;