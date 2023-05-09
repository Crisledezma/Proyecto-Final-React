import { ButtonElement } from '@/components/atoms/Button';
import { IMovie } from '@/contexts/peliculas-context';
import { TextareaAutosize } from '@mui/base';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating'

const MOVIES_DB_API_KEY = 'ea51fa5a31099013c2cb7cb6ba36876f';

export function EstrenoPorId() {
  const router = useRouter()
  const { id } = router.query;
  const [peli, setPeli] = useState<IMovie | null>(null);

  const goHome = () => {
    router.push('/');
  }
  const navigateWebPage = (url: string) => {
    window.open(url, '_blank');
  }

  const handleSendComment = () => {

  }
  
  const getPeli = React.useCallback(async () => {
    if (id) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIES_DB_API_KEY}&append_to_response=videos`
      );
      setPeli(response.data);
      console.log(response.data)
    }
  }, [id]);

  React.useEffect(() => {
    getPeli();
  }, [getPeli]);

  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)
    console.log(rate);
    // other logic
  }

  return (
    <div className="contenedor">
      <div className='left-container'>
        <h1>{ peli?.title }</h1>
        <div className="poster">
          <img src={peli?.poster_path && `https://image.tmdb.org/t/p/w500${peli?.poster_path}`} alt="Poster de la película" />
        </div>
      </div>
      <div className="informacion">
        <p><strong>Lanzamiento:</strong> { peli?.release_date }</p>
        <p><strong>Presupuesto:</strong> ${ peli?.budget }</p>
        <p><strong>Géneros:</strong>{peli?.genres.map(genre => <span key={genre.id}>  {genre?.name}</span>)}</p>
        {peli?.tagline && <p><strong>Tagline:</strong> {peli?.tagline}</p>}
        {peli?.overview && <p><strong>Overview:</strong> {peli?.overview}</p>}
        {peli?.homepage && <p><strong>Página web:</strong>
          <ButtonElement
            className=""
            variant='outlined'
            value='Visitar página web'
            onClick={() => navigateWebPage(peli.homepage)}
          /></p>}
        <br />
        <Rating onClick={handleRating} />
        <span className='ms-5'>VOTAR</span>
        <br />
        <TextareaAutosize
          placeholder='Deje su reseña aquí'
          style={{ background: '#eee', minHeight: '150px', width: '100%' }} />
        <br />
        <ButtonElement
          className='mt-5'
          variant='outlined'
          value='Enviar reseña'
          onClick={()=>handleSendComment()}
        />
        <br />
        <ButtonElement
          className='mt-4'
          variant='outlined'
          color='primary'
          value='Volver al inicio'
          onClick={()=>goHome()}
        />
      </div>
    </div>
  )
};

export default EstrenoPorId;