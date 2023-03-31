import {flow, toGenerator, types} from "mobx-state-tree";
import axios from "axios";

export const TodosModel = types.model('TodosModel', {

    id: types.identifier,
    title: types.string,
    completed: types.boolean,

}).actions((self) => ({

    toggle: flow(function* () {
        try {

            self.completed = !self.completed
            yield* toGenerator(axios.put(`http://localhost:3000/todos/${self.id}`, self))

        } catch (e) {
            console.log('error in toggle', e)
        }
    }),

    setTitle: flow(function* (title: string) {
        try {

            self.title = title
            yield* toGenerator(axios.put(`http://localhost:3000/todos/${self.id}`, self))

        } catch (e) {
            console.log('error in setTitle', e)
        }

    }),
}))

