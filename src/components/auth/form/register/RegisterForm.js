import AuthFormButton from '../common/AuthFormButton';
import AuthFormInput from '../common/AuthFormInput';
import AuthFormTitle from '../common/AuthFormTitle';
import AuthRedirect from '../common/AuthRedirect';

const RegisterForm = ({ onSubmit, user, onChange }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 w-96 p-3 shadow border"
    >
      <AuthFormTitle title={'Welcome to M.H Music'} />
      <hr />
      <AuthFormInput
        type={'text'}
        name="name"
        placeholder={'Name'}
        value={user?.name}
        onChange={onChange}
      />
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
        btnTitle={'Register'}
        disabled={
          !user?.name ||
          !user?.password ||
          !user?.email ||
          user?.password.length < 6
        }
      />
      <hr />
      <AuthRedirect
        text="Already have an account?"
        path="/auth/login"
        btnTitle={'Login'}
      />
    </form>
  );
};

export default RegisterForm;
