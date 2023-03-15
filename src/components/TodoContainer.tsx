import React, {FC, useEffect} from 'react';
import TodoItem from "./TodoItem";
import {ITodo} from "../models/models";
import plus from '../assets/plus.svg'
import {todosStore} from "../store";
import {observer} from "mobx-react";


const TodoContainer: FC = () => {
    useEffect(() => {
        todosStore.getTodos()
    }, [])

    const incompleteTodos = todosStore.todos?.filter((todo) => !todo.completed) ?? [];
    const completedTodos = todosStore.todos?.filter((todo) => todo.completed) ?? [];

    const handleCreate = async () => {
        await todosStore.addTodo({completed: false} as ITodo)
    }


    return (
        <div className={'flex justify-between w-[650px] h-[450px]'}>
            <div className={'bg-background-color shadow rounded w-[290px] overflow-auto'}>
                <h1 className='text-xl text-center text-white border-y border-zinc-700 p-2 mb-2'>Tasks</h1>
                {incompleteTodos?.map(todo => (
                    <TodoItem key={todo.id} todo={todo}/>
                ))}
                <button onClick={handleCreate} className='mx-4 px-2 py-1 rounded transition-all flex items-center text-white hover:bg-neutral-700' type='button'>
                    <img className='w-4 mr-4' src={plus} alt="plus"/>
                    Add item
                </button>
            </div>

            <div className={'bg-background-color shadow rounded w-[290px] overflow-auto'}>
                <h1 className='text-xl text-center text-white border-y border-zinc-700 p-2 mb-2'>Completed</h1>
                {completedTodos?.map(todo => (
                    <TodoItem key={todo.id} todo={todo}/>
                ))}
            </div>
        </div>

    );
};

export default observer(TodoContainer);