import React, { useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '@/constants/context';
import type { AuthUser } from './types';

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  // Session timeout logic
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const TIMEOUT_MINUTES = 30; // 30 minutes
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];

    function resetTimeout() {
      if (timeoutId) clearTimeout(timeoutId);
      if (user) {
        timeoutId = setTimeout(
          () => {
            logout();
          },
          TIMEOUT_MINUTES * 60 * 1000
        );
      }
    }

    if (user) {
      events.forEach(event => window.addEventListener(event, resetTimeout));
      resetTimeout();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetTimeout));
    };
    // Only rerun when user changes
  }, [user]);

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

  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
};
