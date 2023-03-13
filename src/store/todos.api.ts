import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ITodo} from "../models/models";

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    tagTypes: ['Todo'],
    endpoints: build => ({
        getTodoList: build.query<ITodo[], void>({
            query: () => ({
                url: `/todos`,
            }),
            providesTags: result => ['Todo']
        }),
        createPost: build.mutation<ITodo, ITodo>({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['Todo']
        }),
        updateTodo: build.mutation<ITodo, ITodo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['Todo']
        }),
        deleteTodo: build.mutation<ITodo, number>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todo']
        }),
    })
})

export const {useGetTodoListQuery, useCreatePostMutation, useUpdateTodoMutation, useDeleteTodoMutation} = todoApi
