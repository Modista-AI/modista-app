// pages/index.js
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();
  const { user } = useUser();

  // Check if the user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      // Redirect to the login page if not authenticated
      router.push('/login');
    }
  }, []);

  const goToUpload = () => {
    router.push('/upload');
  };

  const goToCloset = () => {
    router.push('/closet');
  };

  // If the user is not authenticated, return null until the redirect happens
  // if (!user) {
  //   return null;
  // }

  return (
    <Layout>
      <div className="relative flex flex-col items-center justify-center h-screen text-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
          <source src="/modistahome.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute z-10 w-full h-full bg-black opacity-50"></div>

        <div className="relative z-20 p-4">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Modista</h1>
          {user && <p className="text-white mb-4">Hello, Explore, upload, and get recommendations on your clothing style!</p>}
          <div className="flex flex-col space-y-4 mt-4">
            <button
              className="text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out"
              style={{
                backgroundImage: 'linear-gradient(to right, #9D50BB, #6E48AA)',
              }}
              onClick={goToUpload}
            >
              Upload Your Clothing
            </button>

            <button
              className="text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
              style={{
                backgroundImage: 'linear-gradient(to right, #FF6B6B, #FF8787)',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundImage = 'linear-gradient(to right, #E63946, #FF4D6D)')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundImage = 'linear-gradient(to right, #FF6B6B, #FF8787)')
              }
              onClick={goToCloset}
            >
              View Your Closet
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
