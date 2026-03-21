import { AppPaths } from '@routes/paths';
import { Roles } from 'enums /Roles';

export interface NavItem {
  label: string;
  path: string;
  roles?: Roles[];
  guestOnly?: boolean;
}

export const NavItems: NavItem[] = [
  { label: 'Register', path: AppPaths.REGISTER, guestOnly: true },
  { label: 'Login', path: AppPaths.LOGIN, guestOnly: true },
  { label: 'Home', path: AppPaths.HOME },
  { label: 'Movies', path: AppPaths.MOVIES, roles: [Roles.ADMIN, Roles.USER] },
  { label: 'Admin', path: AppPaths.ADMIN_MOVIES, roles: [Roles.ADMIN] },
  {
    label: 'Favorites',
    path: AppPaths.FAVORITES,
    roles: [Roles.ADMIN, Roles.USER],
  },
];
