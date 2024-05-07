// // pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Redirect to the backend auth endpoint
    router.push('http://localhost:3000/auth');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin} disabled={isLoading}>
        {isLoading ? 'Redirecting...' : 'Login with Google'}
      </button>
    </div>
  );
}

