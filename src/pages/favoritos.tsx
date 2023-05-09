import { ProtectedPage } from '@/components/layouts/ProtectedPage'
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { getMovies, removeMovie } from '@/services/firebase';
import ResponsiveAppBar from '@/components/molecules/AppBar';
import { useState } from 'react';
import { IMovie } from '@/contexts/peliculas-context';
import React from 'react';
import { Card, CardMedia } from '@mui/material';
import { ButtonElement } from '@/components/atoms/Button';
import { useRouter } from "next/navigation";

const Favoritos = () => {
  const { user } = useFirebaseAuth();
  const [favorites, setFavorites] = useState<IMovie[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const traerFavoritos = async () => {
      if (user) {
        const movies = await getMovies(user);
        setFavorites(movies);
      }
    };
    traerFavoritos();
  }, [favorites]);

  const eliminarFavorito = async (id: number) => {
    if (user) {
      await removeMovie(user, id);
    }
  };

  const navigateById = (id: number) => {
    router.push(`/estrenos/${id}`);
  }
  
  return (
    <ProtectedPage>
      <ResponsiveAppBar></ResponsiveAppBar>
      <main
        className={`flex flex-col items-center justify-between px-24 mt-24`}
      >
        <h1 className='text-4xl font-bold text-center text-red-500'>Películas Favoritas</h1>
        <ul className="flex flex-wrap justify-center">
          {favorites.map((favorite) => (
            <li key={favorite.backdrop_path}>
              <Card sx={{ maxWidth: 250 }} className="m-5 text-center pb-5">
                <CardMedia
                  sx={{ height: 400, width: 250 }}
                  image={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`}
                  title={favorite.title}
                />
                <p className='py-4 text-blue-600 font-semibold'>{favorite.title}</p>
                <ButtonElement
                  className='mb-4'
                  value='Eliminar de favoritos'
                  variant='contained'
                  onClick={() => eliminarFavorito(favorite.id)}
                  color='error'
                />
                <ButtonElement
                  value='Ver más'
                  variant='outlined'
                  onClick={() => navigateById(favorite.id)}
                />
              </Card>
            </li>
          ))}
        </ul>
      </main>
    </ProtectedPage>
  )
}

export default Favoritos;