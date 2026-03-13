import MoviesPage from '@pages/Movies/MoviesPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { MovieProvider } from './context/MoviesContext';
import { HomePage } from './pages/Home/HomePage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { AppPaths } from './routes/paths';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieProvider>
        <Layout>
          <Routes>
            <Route path={AppPaths.HOME} element={<HomePage />} />

            <Route path={AppPaths.MOVIES} element={<MoviesPage />} />

            <Route path={AppPaths.NOT_FOUND} element={<NotFoundPage />}></Route>
            <Route path={AppPaths.NON_EXSTING} element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </MovieProvider>
    </QueryClientProvider>
  );
}

export default App;
