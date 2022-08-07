import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import Cookies from 'js-cookie';
import { logout } from 'redux/reducers/authSlice';
import { getMe } from 'api/auth';
import { useEffect, useState } from 'react';

const CommonLayout = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    authorizeAdminFromBackend();
  }, []);

  const authorizeAdminFromBackend = async () => {
    const { err, data } = await getMe(auth?.token);

    if (err) {
      console.log(err);
      return;
    }
    if (data?.success) {
      if (data?.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove('auth');
    dispatch(logout());
    window.location.href = '/auth/login';
  };
  return (
    <div className="main">
      <div className="header h-16 flex justify-between p-5 shadow items-center">
        <Link
          className="text-3xl font-bold text-purple-600 hover:text-purple-800 transition"
          to={'/'}
        >
          M.H Music
        </Link>
        <div className="flex items-center space-x-5">
          {isAdmin && (
            <Link
              to={'/admin/all-songs'}
              className={`font-semibold text-xl cursor-pointer text-purple-600 hover:text-purple-800 transition ${
                pathname === '/admin/all-songs' ? 'underline' : ''
              }`}
            >
              Admin Panel
            </Link>
          )}
          <span className="font-semibold text-xl cursor-pointer text-pink-400 hover:text-pink-600 transition">
            {auth?.name}
          </span>
          <RiLogoutCircleRLine
            size={25}
            className="text-orange-300 hover:text-red-400 transition cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
      <div className="content m-10">{children}</div>
    </div>
  );
};

export default CommonLayout;
