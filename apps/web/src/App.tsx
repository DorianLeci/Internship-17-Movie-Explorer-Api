import { Layout } from '@components/Layout/Layout';
import { MovieProvider } from '@context/MoviesContext';
import { AppPaths } from '@routes/paths';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path={AppPaths.REGISTER} element={<RegisterPage />} />
          <Route path={AppPaths.HOME} element={<HomePage />} />

          <Route
            path={AppPaths.MOVIES}
            element={
              <MovieProvider>
                <MoviesPage />
              </MovieProvider>
            }
          />

          <Route path={AppPaths.FAVORITES} element={<FavoriteMoviesPage />} />
          <Route path={AppPaths.MOVIE_DETAIL} element={<MovieDetailsPage />} />
          <Route path={AppPaths.NOT_FOUND} element={<NotFoundPage />} />
          <Route path={AppPaths.NON_EXSTING} element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
