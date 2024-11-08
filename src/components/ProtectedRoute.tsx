import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthService } from '../services/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = AuthService.getAccessToken();
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
}