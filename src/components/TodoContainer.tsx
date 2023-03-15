import React, {FC} from 'react';
import {
    useCreatePostMutation,
    useDeleteTodoMutation,
    useGetTodoListQuery,
    useUpdateTodoMutation
} from "../store/todos.api";
import TodoItem from "./TodoItem";
import {ITodo} from "../models/models";
import plus from '../assets/plus.svg'
import delete_button from "../assets/delete_button.svg";


const TodoContainer: FC = () => {
    const {data: todos} = useGetTodoListQuery()

    const incompleteTodos = todos?.filter((todo) => !todo.completed) ?? [];
    const completedTodos = todos?.filter((todo) => todo.completed) ?? [];

    const [createTodo] = useCreatePostMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [removeTodo] = useDeleteTodoMutation()

    const handleCreate = async () => {
        await createTodo({completed: false} as ITodo)
    }

    return (
        <div className={'flex justify-between w-[600px] h-[450px]'}>
            <div className={'bg-background-color shadow rounded w-[280px] overflow-auto'}>
                <h1 className='text-xl text-center text-white border-y border-zinc-700 p-2 mb-2'>Tasks</h1>
                {incompleteTodos?.map(todo => (
                    <TodoItem key={todo.id} todo={todo} update={updateTodo} remove={removeTodo}/>
                ))}
                <button onClick={handleCreate} className='mx-2.5 px-2 py-1 rounded transition-all flex items-center text-white hover:bg-neutral-700' type='button'>
                    <img className='w-4 mr-3' src={plus} alt="plus"/>
                    Add item
                </button>
            </div>

            <div className={'bg-background-color shadow rounded w-[280px] overflow-auto'}>
                <h1 className='text-xl text-center text-white border-y border-zinc-700 p-2 mb-2'>Completed</h1>
                {completedTodos?.map(todo => (
                    <TodoItem key={todo.id} todo={todo} update={updateTodo} remove={removeTodo}/>
                ))}
            </div>
        </div>

    );
};

export default TodoContainer;