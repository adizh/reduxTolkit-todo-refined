
import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './todoSlice.js'
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'
export const actions= todoSlice.actions;
const reducers = combineReducers({
    todos: todoSlice.reducer
});
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
 middleware: [thunk],
}); 


export default store