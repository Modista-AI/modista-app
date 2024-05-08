

// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import { useUser } from '../context/UserContext';

// export default function SteppingStone() {
//   const router = useRouter();
//   const { setUserDetails } = useUser();

//   useEffect(() => {
//     // Retrieve query parameters
//     const { email, token, name } = router.query;

//     if (email && token && name) {
//       // Store user data via the context
//       setUserDetails(email, token, name);
//     } else {
//       // Redirect to login if no parameters are found and no valid user data is stored
//       const storedUser = localStorage.getItem('user');
//       if (!storedUser) {
//         router.push('/login');
//         return;
//       }
//     }

//     // Redirect to the homepage
//     router.push('/');
//   }, [router.query, router, setUserDetails]);

//   return null; // No visible UI due to quick redirection
// }


import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '../context/UserContext';

export default function SteppingStone() {
  const router = useRouter();
  const { setUserDetails } = useUser();

  useEffect(() => {
    // Retrieve query parameters
    const { email, token, name } = router.query;

    const handleRedirection = async () => {
      if (email && token && name) {
        // Log received user data
        console.log('Setting user details:', { email, token, name });

        // Store user data via the context
        setUserDetails(email, token, name);

        // Introduce a short delay to ensure data is saved before redirection
        await new Promise(resolve => setTimeout(resolve, 200));

        console.log('User details saved, redirecting to home.');
        await router.push('/');
      } else {
        // Redirect to login if no parameters are found and no valid user data is stored
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          console.log('No user details found, redirecting to login.');
          await router.push('/login');
          return;
        }

        // Otherwise, directly go to the home page if the user already exists in local storage
        console.log('User details already exist in local storage, redirecting to home.');
        await router.push('/');
      }
    };

    handleRedirection();
  }, [router.query, router, setUserDetails]);

  return null; // No visible UI due to quick redirection
}
