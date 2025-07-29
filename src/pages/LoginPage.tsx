import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const db = getFirestore();

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // If already logged in and authorized, redirect to /people
  if (user && (user.role === 'admin' || user.role === 'hr')) {
    return <Navigate to="/people" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'user-roles', userCred.user.uid));
      const userData = userDoc.data();
      if (!userData || (userData.role !== 'admin' && userData.role !== 'hr')) {
        setError('Access denied: Only admins and HR managers can login.');
        await auth.signOut();
        setLoading(false);
        return;
      }
      // No need for manual redirect, context will trigger rerender and redirect above
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4 shadow-xl border-purple-200">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-700 font-bold text-center">
            Employee Dashboard Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Your password"
                className="focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
