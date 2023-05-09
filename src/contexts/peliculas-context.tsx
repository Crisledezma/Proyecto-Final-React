import axios from 'axios';
import React from 'react';

const MOVIES_DB_API_KEY = 'ea51fa5a31099013c2cb7cb6ba36876f';

export interface IMovie {
  poster_path      : string;
  adult            : boolean;
  overview         : string;
  release_date     : string;
  genre_ids        : number[];
  id               : number;
  original_title   : string;
  original_language: string;
  title            : string;
  backdrop_path    : string;
  popularity       : number;
  vote_count       : number;
  video            : boolean;
  vote_average     : number;
  budget           : number;
  genres           : Genre[];
  tagline          : string;
  homepage         : string;
}

interface Genre {
  id: number;
  name: string;
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
