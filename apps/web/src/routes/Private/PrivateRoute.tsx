import useAuth from '@hooks/useAuth';
import type { Roles } from 'enums /Roles';
import type { ReactNode } from 'react';
import { Navigate, type RouteProps } from 'react-router-dom';

type PrivateRouteProps = RouteProps & {
  children: ReactNode;
  allowedRoles: Roles[];
};

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user } = useAuth();

  const userRole = user?.role;

  if (!allowedRoles.includes(userRole as Roles))
    return <Navigate to="unauthorized" replace />;

  return <>{children}</>;
};

export default PrivateRoute;
