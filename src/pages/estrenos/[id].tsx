import { ButtonElement } from '@/components/atoms/Button';
import { IComment, IMovie } from '@/contexts/peliculas-context';
import { getRating, setComment, setRates } from '@/services/firebase';
import { TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { getComments } from '@/services/firebase';

const MOVIES_DB_API_KEY = 'ea51fa5a31099013c2cb7cb6ba36876f';

export const EstrenoPorId = () => {
  const [commentValue, setCommentValue] = useState<string>('');
  const [comments, setComments] = useState<IComment[]>([]);
  const [peli, setPeli] = useState<IMovie | null>(null);
  const router = useRouter()
  const { id } = router.query;

  // Traer comentarios
  useEffect(() => {
    const traerComentarios = async () => {
      if (peli) {
        const comentarios = await getComments(peli);
        comentarios && setComments(comentarios);
      }
    };
    traerComentarios();
  }, [peli]);
  // Enviar comentarios
  const handleSendComment = async () => {
    if (commentValue && peli) {
      const id = Math.random();
      await setComment(commentValue as string, peli.id, id);
      const newComments = [...comments];
      newComments.unshift({ comment: commentValue,  movieId: peli.id as unknown as string, id });
      setComments(newComments);
      setCommentValue('');
    }
  };
  // Enviar rating
  const [rating, setRating] = useState<number>(0)
  const handleRating = async (rate: number) => {
    if (peli) {
      await setRates(rate, peli.id as unknown as string);
      setRating(rate);
    }
  };
  useEffect(() => {
    const traerRatings = async () => {
      if (peli) {
        const rate = await getRating(peli.id)
        setRating(rate);
      }
    }
    traerRatings();
  },[peli])
  // Navegación
  const goHome = () => {
    router.push('/');
  }
  const navigateWebPage = (url: string) => {
    window.open(url, '_blank');
  }
  // Traer la película seleccionada
  const getPeli = React.useCallback(async () => {
    if (id) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIES_DB_API_KEY}&append_to_response=videos`
      );
      setPeli(response.data);
      if (peli) {
        const rate = await getRating(peli.id)
        setRating(rate);
      }
    }
  }, [id]);

  React.useEffect(() => {
    getPeli();
  }, [getPeli]);

  return (
    <div className='main-container'>
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
          <Rating transition initialValue={rating} onClick={handleRating} />
          <span className='ms-5'>VOTAR</span>
          <br />
          <TextareaAutosize
            id='comment-input'
            placeholder='Deje su reseña aquí'
            value={commentValue}
            onChange={(e)=>setCommentValue(e.target.value)}
            style={{ background: '#eee', minHeight: '150px', width: '100%' }} 
          />
          <br />
          <ButtonElement
            className='mt-5'
            variant='outlined'
            value='Enviar reseña'
            onClick={handleSendComment}
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
      <div className='resenas-container'>
        <h2 className='text-center font-bold mt-12'>RESEÑAS</h2>
        {comments.map((comment) => (<li className='my-6' key={comment.id}>{ comment.comment }</li>))}
      </div>
    </div>
  )
};

export default EstrenoPorId;