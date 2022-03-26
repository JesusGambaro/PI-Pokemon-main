import {mainReducer} from "../reducers/mainReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {backupReducer} from "../reducers/backupReducer";
const store = createStore(
  combineReducers({pokemons: mainReducer, backup: backupReducer}),
  applyMiddleware(thunk)
);

export default store;
