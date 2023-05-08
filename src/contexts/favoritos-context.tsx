// import axios from 'axios';
// import React, { PropsWithChildren } from 'react';
// import { IMovie } from './peliculas-context';

// const MOVIES_DB_API_KEY = 'ea51fa5a31099013c2cb7cb6ba36876f';
// const ACCOUNT_ID = 14946988;

// interface FavoritosContextProps {
//   favoriteMovies: IMovie[];
// }

// const FavoritosContext = React.createContext<FavoritosContextProps>({
//   favoriteMovies: [],
// });

// export const FavoritosContextProvider: React.FC<PropsWithChildren> = ({
//   children,
// }) => {
//   const [favoriteMovies, setFavoriteMovies] =  React.useState<IMovie[]>([])
//   const getFavoriteMovies = React.useCallback(async () => {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/favorite/movies`, {
//         params: {
//           api_key: MOVIES_DB_API_KEY,
//           language: 'es',
//           page: 1,
//           sort_by: 'created_at.asc'
//         }
//       }
//     );
//     console.log('Favoritos...',response);
//     setFavoriteMovies(response.data.results);
//   }, []);

//   React.useEffect(() => {
//     getFavoriteMovies();
//   }, [getFavoriteMovies]);

//   const contextValue = React.useMemo(
//     () => ({
//       favoriteMovies,
//     }), [favoriteMovies]
//   );

//   return (
//     <FavoritosContext.Provider value={contextValue} >
//       {children}
//     </FavoritosContext.Provider>
//   );
// }

// export const useFavoritosContext = () =>
//   React.useContext<FavoritosContextProps>(FavoritosContext);