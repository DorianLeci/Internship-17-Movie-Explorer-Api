import LocalStorage from '@api/helpers/LocalStorage';
import { QueryKeys } from '@api/QueryKeys';
import { useMe } from '@api/useMe';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { AppPaths } from '@routes/paths';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { NavItems } from '../../helpers/NavItems';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const LOGOUT_TIMEOUT = 2500;

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const [_, setValue] = useLocalStorage<string | null>({
    key: LocalStorage.accessTokenKey,
    initialValue: null,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useMe();
  const isLoggedIn = !!data;

  const filteredNavItems = useMemo(() => {
    return NavItems.filter((item) => {
      if (
        isLoggedIn &&
        (item.path === AppPaths.REGISTER || item.path === AppPaths.LOGIN)
      )
        return false;

      if (!isLoggedIn && item.path === AppPaths.FAVORITES) return false;

      return true;
    });
  }, [data]);

  const handleLogout = () => {
    setValue(null);
    localStorage.removeItem(LocalStorage.accessTokenKey);
    toast.success('Successfully logged out');

    queryClient.setQueryData([QueryKeys.ME], null);

    setTimeout(() => navigate(AppPaths.HOME), LOGOUT_TIMEOUT);
  };

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
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.link}  ${isActive ? styles.active : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
