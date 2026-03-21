import useAuth from '@hooks/useAuth';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { FaSignOutAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { NavItems } from '../../helpers/NavItems';
import styles from './Layout.module.scss';
import NavItem from './components/NavItem/NavItem';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className={styles.container}>
      <Toaster
        position="top-right"
        containerStyle={{
          top: 130,
          right: 20,
        }}
        toastOptions={{
          style: {
            fontSize: '20px',
            color: 'white',
            background: 'rgba(30,30,30,0.8)',
            boxShadow: '0px 2px 10px #ffb3b3',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
      <header className={styles.header}>
        <h1>Movie Explorer</h1>
        <nav className={styles.nav}>
          {NavItems.map((item) => (
            <NavItem
              key={item.label}
              path={item.path}
              label={item.label}
              roles={item.roles}
              guestOnly={item.guestOnly}
            ></NavItem>
          ))}
          {isLoggedIn && (
            <button className={styles.logoutButton} onClick={logout}>
              <FaSignOutAlt size={30}></FaSignOutAlt>
              <span>Logout</span>
            </button>
          )}
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
