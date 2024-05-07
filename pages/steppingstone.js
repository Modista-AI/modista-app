

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '../context/UserContext';

export default function SteppingStone() {
  const router = useRouter();
  const { setUserDetails } = useUser();

  useEffect(() => {
    // Retrieve query parameters
    const { email, token, name } = router.query;

    if (email && token && name) {
      // Store user data via the context
      setUserDetails(email, token, name);
    } else {
      // Redirect to login if no parameters are found and no valid user data is stored
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/login');
        return;
      }
    }

    // Redirect to the homepage
    router.push('/');
  }, [router.query, router, setUserDetails]);

  return null; // No visible UI due to quick redirection
}