import {mainReducer} from "../reducers/mainReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {loadingReducer} from "../reducers/loadingReducer";
const store = createStore(
  combineReducers({pokemons: mainReducer}),
  applyMiddleware(thunk)
);

export default store;
