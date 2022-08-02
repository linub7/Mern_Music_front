import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { alertsSlice } from './reducers/alertSlice';
import { authSlice } from './reducers/authSlice';

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  auth: authSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
