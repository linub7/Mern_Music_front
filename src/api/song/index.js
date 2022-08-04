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
