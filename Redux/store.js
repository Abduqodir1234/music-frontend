import {applyMiddleware, combineReducers, createStore} from "redux";
import { mainreducer } from "./Reducers/MainReducer";
import ThunkMiddleware from "redux-thunk"

const rooreducer = combineReducers({
    main: mainreducer,
})
const store = createStore(rooreducer,applyMiddleware(ThunkMiddleware))
store.subscribe(() => {
    console.log(store.getState())
})
export default store;