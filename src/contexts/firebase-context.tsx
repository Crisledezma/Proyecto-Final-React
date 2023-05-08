import { FirebaseApp, initializeApp, getApps } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import React from "react";

export interface FirebaseContextProps {
  firebaseApp: FirebaseApp | null;
  firebaseAuth: Auth | null;
}

const firebaseConfig = {
  apiKey: "AIzaSyAXGpwTRULUX5Qtc4Q-mc0j6prfykk-xSA",
  authDomain: "peliculas-app-6bfee.firebaseapp.com",
  projectId: "peliculas-app-6bfee",
  storageBucket: "peliculas-app-6bfee.appspot.com",
  messagingSenderId: "270334374848",
  appId: "1:270334374848:web:2fcf4ade33ac0a89600e25",
  measurementId: "G-X8NPVRTMKM"
};


let app: FirebaseApp | null = null;
let auth: Auth | null = null;

const initFirebase = () => {
  if (!app || getApps().length === 0) {
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

  const contextValue: FirebaseContextProps = React.useMemo(
    () => ({
      firebaseApp,
      firebaseAuth,
    }),
    [firebaseApp, firebaseAuth]
  );

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () =>
  React.useContext<FirebaseContextProps>(FirebaseContext);
