import { signinUser } from 'api/auth';
import LoginForm from 'components/auth/form/login/LoginForm';
import AuthCommonLayout from 'components/auth/layout/AuthCommonLayout';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import Cookies from 'js-cookie';
import { setAuth } from 'redux/reducers/authSlice';
import CustomSpinner from 'components/Common/CustomSpinner';

const LoginPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { loading } = useSelector((state) => state.alerts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(showLoading());

    const { err, data } = await signinUser(user);

    if (err) {
      console.log(err);
      toast.error(err?.error);
      dispatch(hideLoading());
      return;
    }
    toast.success('Successfully logged in');
    const { success, ...rest } = data;
    dispatch(hideLoading());
    Cookies.set('auth', JSON.stringify(rest));
    dispatch(setAuth(rest));
    navigate('/');
  };
  if (loading) return <CustomSpinner />;
  return (
    <AuthCommonLayout>
      <LoginForm onChange={handleChange} onSubmit={handleSubmit} user={user} />
    </AuthCommonLayout>
  );
};

export default LoginPage;
