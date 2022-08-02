import Login from 'pages/auth/login';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export default function LoggedInRoutes() {
  const { auth } = useSelector((state) => state.auth);

  return auth?.token ? <Outlet /> : <Login />;
}
