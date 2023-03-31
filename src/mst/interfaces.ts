import { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree'
import {TodosModel} from "./models/Todos.model";
import {RootStore} from "./store/RootStore.store";


export interface IRootStore extends Instance<typeof RootStore> {}
export interface IRootStoreSnapshotIn extends SnapshotIn<typeof RootStore> {}
export interface IRootStoreSnapshotOut extends SnapshotOut<typeof RootStore> {}


export interface ITodoModel extends Instance<typeof TodosModel> {}
export interface ITodoModelSnapshotIn extends SnapshotIn<typeof TodosModel> {}
export interface ITodoModelSnapshotOut extends SnapshotOut<typeof TodosModel> {}