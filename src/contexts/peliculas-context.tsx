import axios from 'axios';
import React from 'react';

const MOVIES_DB_API_KEY = 'ea51fa5a31099013c2cb7cb6ba36876f';
const ACCOUNT_ID = 14946988;
const MOVIES_DB_API_KEY_V4_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTUxZmE1YTMxMDk5MDEzYzJjYjdjYjZiYTM2ODc2ZiIsInN1YiI6IjYzMmYyMmI0YWJkYWZjMDA4NDAzNjVjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rkdsR4sRq5M2Pcj9JPMDH0GlvQhCgrBZED2fDDrCt0g'

export interface IMovie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface PeliculasContextProps {
  popularMovies: IMovie[];
}

const PeliculasContext = React.createContext<PeliculasContextProps>({
  popularMovies: [],
});

export const PeliculasContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [popularMovies, setPopularMovies] = React.useState<IMovie[]>([]);
  const getPopularMovies = React.useCallback(async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIES_DB_API_KEY}&language=esS&page=1`
    );
    // console.log(response.data.results);
    setPopularMovies(response.data.results);
  }, []);

  React.useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);

  const contextValue = React.useMemo(
    () => ({
      popularMovies,
    }),
    [popularMovies]
  );

  return (
    <PeliculasContext.Provider value={contextValue}>
      {children}
    </PeliculasContext.Provider>
  );
};

export const usePeliculasContext = () =>
  React.useContext<PeliculasContextProps>(PeliculasContext);
