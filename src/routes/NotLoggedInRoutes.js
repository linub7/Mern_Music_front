import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function NotLoggedInRoutes() {
  const { auth } = useSelector((state) => state.auth);
  return auth?.token ? <Navigate to={'/'} /> : <Outlet />;
}
