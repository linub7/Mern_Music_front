import { Link } from 'react-router-dom';

const AuthRedirect = ({ text, path, btnTitle }) => {
  return (
    <div className="flex items-center space-x-1">
      <p className="">{text}</p>
      <Link
        className="font-semibold hover:text-purple-500 transition"
        to={path}
      >
        {btnTitle}
      </Link>
    </div>
  );
};

export default AuthRedirect;
