const AuthFormInput = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      required
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default AuthFormInput;
