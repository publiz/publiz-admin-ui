import {
  PropsWithChildren,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { User, firebaseAuth, getMyProfile } from "../api";
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { buildQueryOptions } from "../libs/query";

type SignUpPayload = {
  email: string;
  password: string;
};

type SignInPayload = {
  email: string;
  password: string;
};

export type AuthContextState = {
  authInitializing: boolean;
  signUp: (payload: SignUpPayload) => Promise<void>;
  signIn: (payload: SignInPayload) => Promise<void>;
  forgetPasswordByEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  myProfile?: User;
};

export const AuthContext = createContext<AuthContextState>({
  authInitializing: false,
  myProfile: undefined,
  signUp: () => {
    throw new Error("Unimplemented");
  },
  signIn: () => {
    throw new Error("Unimplemented");
  },
  signOut: () => {
    throw new Error("Unimplemented");
  },
  forgetPasswordByEmail: () => {
    throw new Error("Unimplemented");
  },
});

export const AuthProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const {
    data: myProfile,
    refetch,
    isPending: authInitializing,
  } = useQuery({
    ...buildQueryOptions(getMyProfile),
    enabled: false,
  });
  useEffect(() => {
    const onAuthStateChanged = async (user: FirebaseUser | null) => {
      if (user) {
        refetch();
      }
    };

    const subscriber = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const signUp = useCallback(async ({ email, password }: SignUpPayload) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInPayload) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  }, []);

  const appSignOut = useCallback(async () => {
    await signOut(firebaseAuth);
  }, []);

  const forgetPasswordByEmail = useCallback(async (email: string) => {
    await sendPasswordResetEmail(firebaseAuth, email);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authInitializing,
        signUp,
        signIn,
        signOut: appSignOut,
        forgetPasswordByEmail,
        myProfile: myProfile?.data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth hook must be inside an AuthProvider");
  }
  return context;
};
