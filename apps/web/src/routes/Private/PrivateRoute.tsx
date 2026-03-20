import { useMe } from '@api/useMe';
import Spinner from '@components/Spinner';
import type { Roles } from 'enums /Roles';
import type { ReactNode } from 'react';
import { Navigate, type RouteProps } from 'react-router-dom';

type PrivateRouteProps = RouteProps & {
  children: ReactNode;
  allowedRoles: Roles[];
};

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { data, isLoading } = useMe();

  if (isLoading) return <Spinner />;

  const userRole = data?.role;

  if (!allowedRoles.includes(userRole as Roles))
    return <Navigate to="unauthorized" replace />;

  return <>{children}</>;
};

export default PrivateRoute;
