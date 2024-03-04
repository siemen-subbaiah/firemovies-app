import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthState = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unSub();
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser as User, {
        displayName: name,
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Error', error.message, [
        {
          text: 'OK',
        },
      ]);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Error', error.message, [
        {
          text: 'OK',
        },
      ]);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
