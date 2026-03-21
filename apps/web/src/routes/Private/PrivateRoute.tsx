import Spinner from '@components/Spinner';
import useAuth from '@hooks/useAuth';
import { AppPaths } from '@routes/paths';
import type { Roles } from 'enums /Roles';
import type { ReactNode } from 'react';
import { Navigate, type RouteProps } from 'react-router-dom';

type PrivateRouteProps = RouteProps & {
  children: ReactNode;
  allowedRoles: Roles[];
};

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to={AppPaths.LOGIN} replace />;

  const userRole = user?.role;

  if (!allowedRoles.includes(userRole as Roles))
    return <Navigate to={AppPaths.FORBIDDEN} replace />;

  return <>{children}</>;
};

export default PrivateRoute;
