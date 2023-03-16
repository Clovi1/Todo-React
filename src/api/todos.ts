import axios, {AxiosResponse} from "axios";
import {ITodo} from "../models/models";

export const fetchTodos = async () => {
    try {
        const {data}: AxiosResponse<ITodo[]> = await axios.get('http://localhost:3000/todos')
        return data || []
    } catch (e) {
        console.error(e)
    }
}

export const addTodo = async (todo: ITodo) => {
    try {
        const {data}: AxiosResponse<ITodo> = await axios.post('http://localhost:3000/todos', todo)
        return data || null
    } catch (e) {
        console.error(e)
    }
}

export const updateTodo = async (todo: ITodo) => {
    try {
        const {data}: AxiosResponse<ITodo> = await axios.put(`http://localhost:3000/todos/${todo.id}`, todo)
        return data || null
    } catch (e) {
        console.error(e)
    }
}

export const removeTodo = async (id: number) => {
    try {
        await axios.delete(`http://localhost:3000/todos/${id}`)
    } catch (e) {
        console.error(e)
    }
}


