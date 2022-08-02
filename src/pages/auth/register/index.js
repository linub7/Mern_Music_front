import { signupUser } from 'api/auth';
import RegisterForm from 'components/auth/form/register/RegisterForm';
import AuthCommonLayout from 'components/auth/layout/AuthCommonLayout';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';

const RegisterPage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

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

    const { err, data } = await signupUser(user);

    if (err) {
      console.log(err);

      toast.error(
        err?.error === 'Duplicate fields value entered'
          ? 'Email already exists'
          : err?.error
      );
      dispatch(hideLoading());
      return;
    }

    console.log(data);

    toast.success('Successfully registered');
    dispatch(hideLoading());
    navigate('/auth/login');
  };
  return (
    <AuthCommonLayout>
      <RegisterForm
        onSubmit={handleSubmit}
        user={user}
        onChange={handleChange}
      />
    </AuthCommonLayout>
  );
};

export default RegisterPage;
