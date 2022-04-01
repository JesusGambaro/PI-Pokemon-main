import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {mainReducer} from "../reducers/mainReducer";
import {backupReducer} from "../reducers/backupReducer";

const store = createStore(
  combineReducers({pokemons: mainReducer, backup: backupReducer}),
  applyMiddleware(thunk)
);

export default store;
