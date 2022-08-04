import { createSlice } from '@reduxjs/toolkit';

export const songsSlice = createSlice({
  name: 'song',
  initialState: {
    songs: [],
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
