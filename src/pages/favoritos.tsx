import { ProtectedPage } from '@/components/layouts/ProtectedPage'
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { saveFavoriteMovie } from '@/services/firebase';
import { Card, CardMedia } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ResponsiveAppBar from '@/components/molecules/AppBar';
import { useFavoritosContext } from '@/contexts/favoritos-context';

export default function Favoritos() {
  const { favoriteMovies } = useFavoritosContext();
  console.log('favoriteMovies en favoritos', favoriteMovies);
  const { user } = useFirebaseAuth();
  
  return (
    <ProtectedPage>
      <ResponsiveAppBar></ResponsiveAppBar>
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-24 mt-24`}
      >
        <h1 className='text-4xl font-bold text-center text-red-500'>Películas Favoritas</h1>
        <ul className="flex flex-wrap justify-center">
          {favoriteMovies.map((movie) => (
            <li key={movie.id}>
              <Card sx={{ maxWidth: 200 }} className="m-5 text-center padding">
                <CardMedia
                  sx={{ height: 250, width: 200 }}
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  title={movie.title}
                />
                <p>{movie.title}</p>
                <LoadingButton
                  className="m-5"
                  variant='outlined'
                  color='secondary'
                  onClick={() => user && saveFavoriteMovie(movie, user)}
                >
                  + Favoritos
                </LoadingButton>
              </Card>
            </li>
          ))}
        </ul>
      </main>
    </ProtectedPage>
  )
}
