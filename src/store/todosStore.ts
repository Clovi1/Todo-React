import {ITodo} from "../models/models";
import {makeAutoObservable} from "mobx";
import {addTodo, fetchTodos, removeTodo, updateTodo} from "../api/todos";

export class TodosStore {
    todos: ITodo[] = []

    async getTodos() {
        const data = await fetchTodos()
        if (data) {
            this.todos = data
        }
    }

    async addTodo(todo: ITodo) {
        const data = await addTodo(todo)
        if (data) {
            this.todos.push(data)
        }
    }

    async updateTodo(todo: ITodo) {
        const data = await updateTodo(todo)
        const index = this.todos.findIndex((item) => item.id === data?.id);
        if (index >= 0 && data) {
            this.todos[index] = data;
        }
    }

    async removeTodo(id: number) {
        await removeTodo(id)
        this.todos = this.todos.filter(todo => todo.id !== id)
    }

    constructor() {
        makeAutoObservable(this)
    }
}
