import MoviesPage from '@pages/Movies/MoviesPage';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { FavoritesProvider } from './context/FavoritesContext';
import { MovieProvider } from './context/MoviesContext';
import { FavoriteMoviesPage } from './pages/FavoriteMovies/FavoriteMoviesPage';
import { HomePage } from './pages/Home/HomePage';
import { MovieDetailsPage } from './pages/MovieDetails/MovieDetailsPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { AppPaths } from './routes/paths';

function App() {
  return (
    <MovieProvider>
      <FavoritesProvider>
        <Layout>
          <Routes>
            <Route path={AppPaths.HOME} element={<HomePage />} />

            <Route path={AppPaths.MOVIES} element={<MoviesPage />} />

            <Route
              path={AppPaths.MOVIE_DETAIL}
              element={<MovieDetailsPage />}
            />

            <Route path={AppPaths.FAVORITES} element={<FavoriteMoviesPage />} />

            <Route path={AppPaths.NOT_FOUND} element={<NotFoundPage />}></Route>
            <Route path={AppPaths.NON_EXSTING} element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </FavoritesProvider>
    </MovieProvider>
  );
}

export default App;
