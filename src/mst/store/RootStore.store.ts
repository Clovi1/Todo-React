import {applySnapshot, cast, flow, toGenerator, types} from 'mobx-state-tree'
import {createContext, useContext} from 'react'
import {TodosModel} from "../models/Todos.model";
import {IRootStore, ITodoModel, ITodoModelSnapshotIn} from "../interfaces";
import {nanoid} from "nanoid";
import axios from "axios";


export const RootStore = types.model('RootStore', {

    todos: types.array(TodosModel),

}).views((self) => ({

    get incompleteTodos() {
        return self.todos?.filter(todo => !todo.completed) ?? []
    },

    get completedTodos() {
        return self.todos?.filter(todo => todo.completed) ?? []
    },

})).actions((self) => ({

    fetchTodos: flow(function* () {
        try {

            const _todos: ITodoModelSnapshotIn[] = yield* toGenerator(axios.get('http://localhost:3000/todos').then(res => res.data))
            applySnapshot(self.todos, _todos)

        } catch (e) {
            console.log('error in fetchTodos: ', e)
        }
    }),

    addTodo: flow(function* () {
        try {

            const todo = {id: nanoid(8), title: '', completed: false} as ITodoModel
            yield* toGenerator(axios.post('http://localhost:3000/todos', todo))
            self.todos.push(todo)

        } catch (e) {
            console.log('error in addTodo', e)
        }
    }),

    removeTodo: flow(function* (id: string) {
        try {

            yield* toGenerator(axios.delete(`http://localhost:3000/todos/${id}`))
            const _todos = self.todos.filter((todo) => todo.id !== id)
            applySnapshot(self.todos, _todos)

        } catch (e) {
            console.log('error in removeTodo', e)
        }
    }),

}))

export const store = RootStore.create({})

export const ContextRootStore = createContext<IRootStore>(store)

export const useRootStore = () => useContext(ContextRootStore)