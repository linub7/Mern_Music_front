import { createSlice } from '@reduxjs/toolkit';

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    selectedPlaylist: null,
  },
  reducers: {
    setSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
  },
});

export const { setSelectedPlaylist } = playlistSlice.actions;
