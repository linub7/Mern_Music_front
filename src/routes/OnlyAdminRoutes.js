import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function OnlyAdminRoutes() {
  const { auth } = useSelector((state) => state.auth);

  return auth?.token && auth?.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to={'/'} />
  );
}
