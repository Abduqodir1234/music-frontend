import { combineReducers, createStore } from "redux";
import { mainreducer } from "./Reducers/MainReducer";



const rooreducer = combineReducers({
    main: mainreducer,
})
const store = createStore(rooreducer)
store.subscribe(() => {
    console.log(store.getState())
})
export default store;