import React, {FC, useEffect} from 'react';
import TodoItem from "./TodoItem";
import plus from '../assets/plus.svg'
import {observer} from "mobx-react";
import {useRootStore} from "../mst/store/RootStore.store";


const TodoContainer: FC = () => {
    const {incompleteTodos, completedTodos, addTodo, fetchTodos} = useRootStore()

    useEffect(() => {
        fetchTodos()
    }, [])

    const handleCreate = () => {
        addTodo()
    }


    return (
        <div className={'w-[650px] h-[450px] flex justify-between'}>
            <div className={'w-[290px] bg-background-color shadow rounded overflow-auto'}>
                <h1 className='p-2 mb-2 text-xl text-center text-white border-y border-zinc-700'>Tasks</h1>
                {incompleteTodos?.map(todo => (
                    <TodoItem key={todo.id} todo={todo}/>
                ))}
                <button onClick={handleCreate}
                        className='mx-4 px-2 py-1 flex items-center rounded transition-all text-white hover:bg-neutral-700'
                        type='button'>
                    <img className='w-4 mr-4' src={plus} alt="plus"/>
                    Add item
                </button>
            </div>

            <div className={'w-[290px] bg-background-color shadow rounded overflow-auto'}>
                <h1 className='p-2 mb-2 text-xl text-center text-white border-y border-zinc-700'>Completed</h1>
                {completedTodos?.map(todo => (
                    <TodoItem key={todo.id} todo={todo}/>
                ))}
            </div>
        </div>

    );
};

export default observer(TodoContainer);