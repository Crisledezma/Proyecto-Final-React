import {
  addDoc,
  getFirestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { IMovie } from "@/contexts/peliculas-context";
import { User } from "firebase/auth";

export const alertTrigger = (msg: string) => {
  window.alert(msg);
};

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
