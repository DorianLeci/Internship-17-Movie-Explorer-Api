import type { MovieSortBy } from '../enums/MovieSortBy';
import type { MovieSortDirection } from '../enums/MovieSortDirection';
import type { MoviesState } from '../types/MovieContextType';

const initialState: MoviesState = {
  movies: [],
  page: 1,
  totalPageNum: 1,
};

interface UseBrowseOptions {
  sortBy: MovieSortBy;
  sortDirection: MovieSortDirection;
  minVoteCount?: number;
  minVoteAverage?: number;
}

export function useBrowseMovies({
  sortBy,
  sortDirection,
  minVoteCount = 1000,
  minVoteAverage = 5,
}: UseBrowseOptions) {
  // const [browseState, setBrowseState] = useState<MoviesState>(initialState);
  // const canLoad = browseState.page <= browseState.totalPageNum;
  // // const params = new URLSearchParams({
  // //   api_key: API_KEY,
  // //   sort_by: `${sortBy}.${sortDirection}`,
  // //   page: String(browseState.page),
  // //   'vote_count.gte': String(minVoteCount),
  // //   'vote_average.gte': String(minVoteAverage),
  // // });
  // // const { data, loading, error, refetch } = usePaginatedFetch<MoviesResponse>({
  // //   url: `${BASE_URL}/discover/movie?${params}`,
  // //   skip: !canLoad,
  // // });
  // useEffect(() => {
  //   setBrowseState(initialState);
  // }, [sortBy, sortDirection]);
  // useFetchedData({ data, callback: setBrowseState });
  // console.log(data);
  // return {
  //   moviesState: browseState,
  //   loading,
  //   error,
  //   refetch,
  //   loadMore: () =>
  //     setBrowseState((prev) => ({
  //       ...prev,
  //       page: prev.page + 1,
  //     })),
  // };
}
