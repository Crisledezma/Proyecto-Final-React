import { FirebaseApp, initializeApp, getApps } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import React from "react";

export interface FirebaseContextProps {
  firebaseApp: FirebaseApp | null;
  firebaseAuth: Auth | null;
}

// Credenciales del profe
// const firebaseConfig = {
//   apiKey: "AIzaSyBA7fdmAIQPYffojhOjO_9KwC-fI3azvHY",
//   authDomain: "clasesav1peliculas.firebaseapp.com",
//   projectId: "clasesav1peliculas",
//   storageBucket: "clasesav1peliculas.appspot.com",
//   messagingSenderId: "44884227002",
//   appId: "1:44884227002:web:7e38524fbfe51183cd6383",
//   measurementId: "G-4SQKFK22NC",
// };

// Credenciales viejas
// const firebaseConfig = {
//   apiKey: "AIzaSyAXGpwTRULUX5Qtc4Q-mc0j6prfykk-xSA",
//   authDomain: "peliculas-app-6bfee.firebaseapp.com",
//   projectId: "peliculas-app-6bfee",
//   storageBucket: "peliculas-app-6bfee.appspot.com",
//   messagingSenderId: "270334374848",
//   appId: "1:270334374848:web:2fcf4ade33ac0a89600e25",
//   measurementId: "G-X8NPVRTMKM"
// };

// Credenciales Nuevas
const firebaseConfig = {
  apiKey: "AIzaSyAA0Of_xe8JuCabYeV7ipRDLQ_BqX_G3H0",
  authDomain: "peliculas-app-8761d.firebaseapp.com",
  projectId: "peliculas-app-8761d",
  storageBucket: "peliculas-app-8761d.appspot.com",
  messagingSenderId: "867492886699",
  appId: "1:867492886699:web:5c5eff89846ca6cd271fee",
  measurementId: "G-LHECG85N70"
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

const initFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
};

const FirebaseContext = React.createContext<FirebaseContextProps>({
  firebaseApp: initFirebase(),
  firebaseAuth: null,
});

export const FirebaseContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [firebaseApp, setFirebaseApp] = React.useState<FirebaseApp | null>(app);
  const [firebaseAuth, setFirebaseAuth] = React.useState<Auth | null>(auth);

  React.useEffect(() => {
    if (!firebaseApp) {
      setFirebaseApp(initFirebase());
    }
    if (!firebaseAuth) {
      setFirebaseAuth(getAuth());
    }
  }, [firebaseApp, firebaseAuth]);

  const contextValue: FirebaseContextProps = React.useMemo(() =>
  ({
    firebaseApp,
    firebaseAuth,
  }),[firebaseApp, firebaseAuth]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () =>
  React.useContext<FirebaseContextProps>(FirebaseContext);
