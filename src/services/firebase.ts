import {
  addDoc,
  getFirestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  setDoc
} from "firebase/firestore";
import { IComment, IMovie } from "@/contexts/peliculas-context";
import { User } from "firebase/auth";

export const alertTrigger = (msg: string) => {
  window.alert(msg);
};
// Guardar película favorita
export const saveFavoriteMovie = async (movie: IMovie, firebaseUser: User) => {
  try {
    const moviesCollection = collection(getFirestore(), "movies");
    const querySnapshot = await getDocs(
      query(moviesCollection, where("id", "==", movie.id), where("userId", "==", firebaseUser.uid))
    );
    if (querySnapshot.size > 0) {
      // El elemento ya existe en la base de datos, no se guarda y manda una alerta
      alertTrigger("El elemento ya existe en tu lista de favoritos");
      return;
    }
    const docRef = await addDoc(moviesCollection, {
      userId: firebaseUser.uid,
      ...movie,
    });
  } catch (error) {
    console.error(error);
  }
};
// Traer películas favoritas
export const getMovies = async (firebaseUser: User) => {
  const firebaseQuery = query(
    collection(getFirestore(), "movies"),
    where("userId", "==", firebaseUser.uid)
  );
  const querySnapshot = await getDocs(firebaseQuery);
  const movies: IMovie[] = [];
  querySnapshot.forEach((doc) => {
    movies.push(doc.data() as IMovie);
  });
  return movies;
};
// Traer comentarios
export const getComments = async (movie: IMovie) => {
  try {
    const firebaseQuery = query(
        collection(getFirestore(), "comments"),
        where("movieId", "==", movie.id.toString())
      );
      const querySnapshot = await getDocs(firebaseQuery);
      const comments: IComment[] = [];
      querySnapshot.forEach((doc) => {
      comments.push(doc.data() as IComment);
    });
    return comments;
  } catch (error) {
    console.error(error);    
  }
};
// Eliminar película Favorita
export const removeMovie = async (firebaseUser: User, movieId: number): Promise<void> => {
  try {
    const moviesCollection = collection(getFirestore(), "movies");
    const querySnapshot = await getDocs(
      query(moviesCollection, where("id", "==", movieId), where("userId", "==", firebaseUser.uid))
    );
    if (querySnapshot.size <= 0) {
      alertTrigger("El elemento no existe en la base de datos, no se puede borrar");
      return;
    }
    const deletePromises = querySnapshot.docs.map((doc) => {
      return deleteDoc(doc.ref);
    });
    await Promise.all(deletePromises);
  } catch (error) {
    console.error(error);
  }
};
// Agregar comentario
export const setComment = async (comment: string, movieId: string) => {
  if (comment) {
    try {
      const docRef = await addDoc(collection(getFirestore(), "comments"), {
        movieId: movieId,
        comment: comment,
      });
    } catch (error) {
      console.error(error);
    }
  }
};
// Setear o reemplazar ratings
export const setRates = async (rate: number, movieId: string) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(getFirestore(), 'ratings'),
        where('movieId', '==', movieId),
      ),
    );
    if (querySnapshot.size > 0) {
      const docRef = doc(
        getFirestore(),
        'ratings',
        querySnapshot.docs[0].id,
      );
      await setDoc(docRef, { rate, movieId });
    } else {
      const docRef = await addDoc(collection(getFirestore(), 'ratings'), {
        movieId,
        rate,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
// Traer ratings favoritas
export const getRating = async (movieId: number): Promise<any> => {
  try {
    const firebaseQuery = query(
      collection(getFirestore(), "ratings"),
      where("movieId", "==", movieId)
    );
    const querySnapshot = await getDocs(firebaseQuery);
    const rating = querySnapshot.docs.map(data => data.get('rate'));
    return rating;
  } catch (error) {
    console.error(error);
    return {};
  }
};