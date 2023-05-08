import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { useRouter } from "next/navigation";
import React from "react";

export const ProtectedPage: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useFirebaseAuth();
  const navigate = useRouter();

  React.useEffect(() => {
    if (!user) {
      navigate.push("/login");
    }
  }, [user, navigate]);

  return <>{children}</>;
};
