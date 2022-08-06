import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { alertsSlice } from './reducers/alertSlice';
import { authSlice } from './reducers/authSlice';
import { playlistSlice } from './reducers/playlistSlice';
import { songsSlice } from './reducers/songsSlice';

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  auth: authSlice.reducer,
  songs: songsSlice.reducer,
  playlist: playlistSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
