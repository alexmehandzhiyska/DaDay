import { Navigate, Outlet } from 'react-router-dom';

const UserRoute = () => {
  let stateUser = localStorage.getItem('user');
  const user = stateUser ? stateUser : JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = user ? true : false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

const GuestRoute = () => {
  let stateUser = localStorage.getItem('user');
  const user = stateUser ? stateUser : JSON.parse(localStorage.getItem('user'));

  const isAuthenticated = user ? true : false;

  return isAuthenticated ? <Navigate to="/share-day" /> : <Outlet />
}

export { UserRoute, GuestRoute };