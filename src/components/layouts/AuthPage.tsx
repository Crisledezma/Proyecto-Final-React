import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { useRouter } from "next/router";
import React from "react";

export const AuthPage: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useFirebaseAuth();
  const navigate = useRouter();

  React.useEffect(() => {
    if (user) {
      navigate.push("/");
    }
  }, [user, navigate]);

  return <>{children}</>;
};
