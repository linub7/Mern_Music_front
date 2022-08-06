import client from 'api/client';

export const addSongHandler = async (values, token) => {
  try {
    const { data } = await client.post(`/songs`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getSongsHandler = async (token) => {
  try {
    const { data } = await client.get(`/songs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getSinglePlaylistHandler = async (playlistId, token) => {
  try {
    const { data } = await client.get(`/songs/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const addPlaylistHandler = async (payload, token) => {
  try {
    const { data } = await client.post(
      `/songs/add-playlist`,
      { payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const updatePlaylistHandler = async (playlistId, payload, token) => {
  try {
    const { data } = await client.put(
      `/songs/playlists/${playlistId}`,
      { payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const deletePlaylistHandler = async (playlistId, token) => {
  try {
    const { data } = await client.delete(`/songs/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};
