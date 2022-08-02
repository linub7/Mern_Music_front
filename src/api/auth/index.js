import client from 'api/client';

export const signupUser = async (values) => {
  try {
    const { data } = await client.post(`/signup`, values);
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const signinUser = async (values) => {
  try {
    const { data } = await client.post(`/signin`, values);
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getMe = async (token) => {
  try {
    const { data } = await client.get(`/auth/me`, {
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
