import { IMovie } from '@/contexts/peliculas-context';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const MOVIES_DB_API_KEY = 'ea51fa5a31099013c2cb7cb6ba36876f';

function EstrenoPorId() {
  const router = useRouter()
  const [peli, setPeli] = useState<IMovie | null>(null);
  
  const getPeli = React.useCallback(async () => {
    const { id } = router.query;
    console.log(id);
    if (id) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIES_DB_API_KEY}&append_to_response=videos`
      );
      setPeli(response.data);
      console.log(response)
    }
  }, []);

  React.useEffect(() => {
    getPeli();
  }, [getPeli]);

  return (
    <div className="contenedor">
      <h1>{ peli?.title }</h1>
      <div className="poster">
        <img src={`https://image.tmdb.org/t/p/w500${peli?.poster_path}`} alt="Poster de la película" />
      </div>
      <div className="informacion">
        <p><strong>Año:</strong> 2019</p>
        <p><strong>Director:</strong> Nombre del director</p>
        <p><strong>Reparto:</strong> Nombre del actor 1, Nombre del actor 2, Nombre del actor 3</p>
        <p><strong>Duración:</strong> 120 minutos</p>
        <p><strong>Género:</strong> Acción, Aventura, Ciencia Ficción</p>
        <p><strong>Sinopsis:</strong> Breve descripción de la trama de la película.</p>
        <a href="trailer-de-la-pelicula.mp4" className="boton">Ver trailer</a>
      </div>
    </div>
  )
};

export default EstrenoPorId;