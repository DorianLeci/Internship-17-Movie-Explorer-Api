import type { NavItem } from '@helpers/NavItems';
import useAuth from '@hooks/useAuth';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.scss';

const NavItem = ({ label, path, roles, guestOnly }: NavItem) => {
  const { user, isLoggedIn } = useAuth();

  if (guestOnly && isLoggedIn) return null;
  if (roles && !roles.includes(user?.role!)) return null;

  return (
    <NavLink
      key={path}
      to={path}
      className={({ isActive }) =>
        `${styles.link}  ${isActive ? styles.active : ''}`
      }
    >
      {label}
    </NavLink>
  );
};

export default NavItem;
