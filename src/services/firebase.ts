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
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";

// export const saveFavoriteMovie = async (movie: IMovie, firebaseUser: User) => {
//   try {
//     const docRef = await addDoc(collection(getFirestore(), "movies"), {
//       userId: firebaseUser.uid,
//       ...movie,
//     });

//     console.log("Document written with ID: ", docRef.id);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const saveFavoriteMovie = async (movie: IMovie, firebaseUser: User) => {
  try {
    const moviesCollection = collection(getFirestore(), "movies");
    const querySnapshot = await getDocs(
      query(moviesCollection, where("id", "==", movie.id), where("userId", "==", firebaseUser.uid))
    );

    if (querySnapshot.size > 0) {
      // El elemento ya existe en la base de datos, no se hace nada
      console.log("El elemento ya existe en la base de datos");
      return;
    }

    const docRef = await addDoc(moviesCollection, {
      userId: firebaseUser.uid,
      ...movie,
    });

    console.log("Document written with ID: ", docRef.id);
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

  console.log(movies);
  return movies;
};

