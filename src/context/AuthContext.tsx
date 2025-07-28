import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

interface AuthUser {
  uid: string;
  email: string;
  role: string;
  displayName?: string;
  profilePhoto?: string;
}

const AuthContext = createContext<{ user: AuthUser | null; loading: boolean }>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        const db = getFirestore();
        const userRoleDoc = await getDoc(doc(db, 'user-roles', firebaseUser.uid));
        const userRoleData = userRoleDoc.data();
        if (userRoleData) {
          let displayName = '';
          let profilePhoto = '';
          if (userRoleData.uid && userRoleData.uid.path) {
            const userDocRef = doc(db, userRoleData.uid.path);
            const userDocSnap = await getDoc(userDocRef);
            const userData = userDocSnap.data();
            if (userData) {
              displayName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
              profilePhoto = userData.profilePhoto || '';
            }
          }
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            role: userRoleData.role,
            displayName,
            profilePhoto,
          });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};
