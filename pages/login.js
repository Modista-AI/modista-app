

// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Redirect to the backend auth endpoint
    router.push('https://modista-backend.vercel.app/auth');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(to right, #6658D3, #D158B8)',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          maxWidth: '400px',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '24px', color: '#333', marginBottom: '24px' }}>Welcome to Modista</h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
          Please log in or sign up to continue.
        </p>
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? '#aaa' : '#6658D3',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            width: '100%',
            fontSize: '16px',
            marginBottom: '16px',
          }}
        >
          {isLoading ? 'Redirecting...' : 'Login with Google'}
        </button>
        <p style={{ fontSize: '14px', color: '#333' }}>
          Don`&apos;`t have an account? <span style={{ color: '#6658D3', cursor: 'pointer' }} onClick={handleGoogleLogin}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
