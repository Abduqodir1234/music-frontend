import {applyMiddleware, combineReducers, createStore} from "redux";
import { mainreducer } from "./Reducers/MainReducer";
import ThunkMiddleware from "redux-thunk"
import {fetch_all_musics} from "./Requests/get_all_music";

const rooreducer = combineReducers({
    main: mainreducer,
})
const store = createStore(rooreducer,applyMiddleware(ThunkMiddleware))
store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch(fetch_all_musics())
export default store;