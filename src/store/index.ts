import {injectStores} from "@mobx-devtools/tools";
import {TodosStore} from "./todosStore";

const todosStore = new TodosStore()

injectStores({
    todosStore
})

export {todosStore}
