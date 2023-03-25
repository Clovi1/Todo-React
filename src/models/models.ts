import {types} from "mobx-state-tree";

export interface ITodo {
    id: number;
    title: string;
    completed: boolean;
}

const Todo = types.model({
    name: '',
    done: false,
})
