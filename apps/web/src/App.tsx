import { Layout } from '@components/Layout/Layout';
import { AuthProvider } from '@context/AuthContext';
import { MovieProvider } from '@context/MoviesContext';
import { AppPaths } from '@routes/paths';
import PrivateRoute from '@routes/Private/PrivateRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Roles } from 'enums /Roles';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

const HomePage = lazy(() => import('@pages/Home/HomePage'));
const MoviesPage = lazy(() => import('@pages/Movies/MoviesPage'));
const FavoriteMoviesPage = lazy(
  () => import('@pages/FavoriteMovies/FavoriteMoviesPage'),
);
const MovieDetailsPage = lazy(
  () => import('@pages/MovieDetails/MovieDetailsPage'),
);

const NotFoundPage = lazy(() => import('@pages/NotFound/NotFoundPage'));

const RegisterPage = lazy(() => import('@pages/Register/RegisterPage'));

const LoginPage = lazy(() => import('@pages/Login/LoginPage'));

const ForbiddenPage = lazy(() => import('@pages/Forbidden/ForbiddenPage'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path={AppPaths.REGISTER} element={<RegisterPage />} />
            <Route path={AppPaths.LOGIN} element={<LoginPage />} />
            <Route path={AppPaths.HOME} element={<HomePage />} />

            <Route
              path={AppPaths.MOVIES}
              element={
                <MovieProvider>
                  <MoviesPage />
                </MovieProvider>
              }
            />

            <Route
              path={AppPaths.FAVORITES}
              element={
                <PrivateRoute allowedRoles={[Roles.USER, Roles.ADMIN]}>
                  <FavoriteMoviesPage />
                </PrivateRoute>
              }
            />

            <Route
              path={AppPaths.ADMIN_MOVIES}
              element={
                <PrivateRoute allowedRoles={[Roles.ADMIN]}>
                  <MovieProvider>
                    <MoviesPage isAdmin={true} />
                  </MovieProvider>
                </PrivateRoute>
              }
            />

            <Route
              path={AppPaths.MOVIE_DETAIL}
              element={<MovieDetailsPage />}
            />
            <Route path={AppPaths.NOT_FOUND} element={<NotFoundPage />} />
            <Route path={AppPaths.FORBIDDEN} element={<ForbiddenPage />} />
            <Route path={AppPaths.NON_EXSTING} element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
