import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { NavLink, useLocation } from 'react-router-dom';
import { NavItems } from '../../helpers/NavItems';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

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
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
