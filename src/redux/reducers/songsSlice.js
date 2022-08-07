import { createSlice } from '@reduxjs/toolkit';

export const songsSlice = createSlice({
  name: 'song',
  initialState: {
    songs: localStorage.getItem('songs')
      ? JSON.parse(localStorage.getItem('songs'))
      : [],
    selectedMusic: {},
  },
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    setSelectedMusic: (state, action) => {
      state.selectedMusic = action.payload;
    },
  },
});

export const { setSongs, setSelectedMusic } = songsSlice.actions;
