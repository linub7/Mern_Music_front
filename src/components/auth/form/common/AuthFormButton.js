import { useSelector } from 'react-redux';

const AuthFormButton = ({ btnTitle, disabled }) => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <button disabled={disabled || loading} className="primary" type="submit">
      {btnTitle}
    </button>
  );
};

export default AuthFormButton;
