import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Input,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/';
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/hooks/api/useAuth';
import { Navigate } from 'react-router-dom';

const db = getFirestore();

const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const { user } = useAuth();
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  if (user && (user.role === 'admin' || user.role === 'hr')) {
    return <Navigate to="/people" replace />;
  }

  const onSubmit = async (values: LoginSchema) => {
    setLoading(true);
    setAuthError('');

    try {
      const userCred = await signInWithEmailAndPassword(auth, values.email, values.password);
      const userDoc = await getDoc(doc(db, 'user-roles', userCred.user.uid));
      const userData = userDoc.data();

      if (!userData || (userData.role !== 'admin' && userData.role !== 'hr')) {
        setAuthError('Access denied: Only admins and HR managers can login.');
        await auth.signOut();
      }
    } catch (err) {
      if (err instanceof Error) {
        setAuthError(err.message || 'Login failed');
      } else {
        setAuthError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 shadow-xl border-purple-200">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-700 font-bold text-center">
            Employee Dashboard Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="you@example.com"
                        className="focus:ring-purple-500 focus:border-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Your password"
                        className="focus:ring-purple-500 focus:border-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {authError && <div className="text-red-600 text-sm text-center">{authError}</div>}

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
