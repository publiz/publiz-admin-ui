import {
  PropsWithChildren,
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { User, firebaseAuth, useApiCallImplicitly } from "../api";
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
  token?: string;
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
  const [authInitializing, setInitializing] = useState(true);
  const [token, setToken] = useState<string | undefined>();
  const api = useApiCallImplicitly(token);

  const { data: myProfile } = useQuery({
    queryKey: ["my_profile"],
    queryFn: () => api.getMyProfile(),
    enabled: !!token,
  });

  useEffect(() => {
    const onAuthStateChanged = async (user: FirebaseUser | null) => {
      const idToken = await user?.getIdToken();
      setToken(idToken);
      setInitializing(false);
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
    setToken(undefined);
  }, []);

  const forgetPasswordByEmail = useCallback(async (email: string) => {
    await sendPasswordResetEmail(firebaseAuth, email);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authInitializing,
        token,
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
