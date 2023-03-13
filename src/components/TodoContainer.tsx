import React, {FC, useState} from 'react';
import {
    useCreatePostMutation,
    useDeleteTodoMutation,
    useGetTodoListQuery,
    useUpdateTodoMutation
} from "../store/todos.api";
import TodoItem from "./TodoItem";
import {ITodo} from "../models/models";

const TodoContainer: FC = () => {
    const {data: todos, isLoading, isError} = useGetTodoListQuery()
    const [createTodo, {}] = useCreatePostMutation()
    const [updateTodo, {}] = useUpdateTodoMutation()
    const [removeTodo, {}] = useDeleteTodoMutation()

    const handleCreate = async () => {
        const title = prompt()
        await createTodo({title, completed: false} as ITodo)
    }

    return (
        <div>

            <button onClick={handleCreate}>Создать новый пост</button>
            {isLoading && <h1>Идет загрузка...</h1>}
            {isError && <h1>Ошибка...</h1>}
            <div className={'flex justify-around bg-gray-500 w-screen'}>
                <div className={'bg-red-500 w-[260px]'}>
                    {todos?.map(todo => (
                        !todo.completed &&
                        <TodoItem key={todo.id} todo={todo} update={updateTodo} remove={removeTodo}/>
                    ))}
                </div>
                <div className={'bg-yellow-400 w-[260px] line-through'}>
                    {todos?.map(todo => (
                        todo.completed &&
                        <TodoItem key={todo.id} todo={todo} update={updateTodo} remove={removeTodo}/>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default TodoContainer;