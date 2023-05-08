import { ProtectedPage } from '@/components/layouts/ProtectedPage'
import { usePeliculasContext } from '../contexts/peliculas-context';
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { saveFavoriteMovie, alertTrigger } from '@/services/firebase';
import { Alert, Card, CardMedia } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ResponsiveAppBar from '@/components/molecules/AppBar';
import React from 'react';

export default function Home() {
  const {popularMovies} = usePeliculasContext();
  const { user } = useFirebaseAuth();
  
  return (
    <ProtectedPage>
      <ResponsiveAppBar></ResponsiveAppBar>
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-24 mt-24`}
      >
        <h1 className='text-4xl font-bold text-center text-red-500'>Últimos Estrenos</h1>
        <ul className="flex flex-wrap justify-center">
          {popularMovies.map((movie) => (
            <li key={movie.id}>
              <Card sx={{ maxWidth: 250 }} className="m-5 text-center pb-5">
                <CardMedia
                  sx={{ height: 400, width: 250 }}
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  title={movie.title}
                />
                <p className='py-4 text-blue-600 font-semibold'>{movie.title}</p>
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
