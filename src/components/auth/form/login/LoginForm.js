import AuthFormButton from '../common/AuthFormButton';
import AuthFormInput from '../common/AuthFormInput';
import AuthFormTitle from '../common/AuthFormTitle';
import AuthRedirect from '../common/AuthRedirect';

const LoginForm = ({ onSubmit, user, onChange }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 w-96 p-3 shadow border"
    >
      <AuthFormTitle title={'Welcome Back'} />
      <hr />
      <AuthFormInput
        type={'email'}
        name="email"
        placeholder={'Email'}
        value={user?.email}
        onChange={onChange}
      />
      <AuthFormInput
        type={'password'}
        name="password"
        placeholder={'password'}
        value={user?.password}
        onChange={onChange}
      />
      <AuthFormButton
        btnTitle={'Login'}
        disabled={!user?.password || !user?.email || user?.password.length < 6}
      />
      <hr />
      <AuthRedirect
        text="Don't have an account?"
        path="/auth/register"
        btnTitle={'Register'}
      />
    </form>
  );
};

export default LoginForm;
