import {
  addDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { IMovie } from "@/contexts/peliculas-context";
import { User } from "firebase/auth";
import React, { useEffect } from "react";

export const saveFavoriteMovie = async (movie: IMovie, firebaseUser: User) => {
  try {
    const docRef = await addDoc(collection(getFirestore(), "movies"), {
      userId: firebaseUser.uid,
      ...movie,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
  }
};


export const getMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = React.useState<IMovie[]>([]);
  try {
    useEffect(() => {
      const querySnapshot = getDocs(collection(getFirestore(), 'movies'));
      const favoritas: any[] = [];
      querySnapshot.forEach((favorita) => {
        favoritas.push({...favorita.data, id:favorita.id})
      })
      console.log('Favoritas en firebase.ts',favoritas);
      setFavoriteMovies(favoritas);
    }, [])
  } catch (error) {
    console.error(error);
  }
};
getMovies();

// export const getMovies = async (firebaseUser: User) => {
//   const firebaseQuery = query(
//     collection(getFirestore(), "movies"),
//     where("userId", "==", firebaseUser.uid)
//   );

//   const querySnapshot = await getDocs(firebaseQuery);
//   const movies: IMovie[] = [];

//   querySnapshot.forEach((doc) => {
//     movies.push(doc.data() as IMovie);
//   });

//   console.log(movies);
//   return movies;
// };