
// pages/profile.js
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { UserIcon, MailIcon } from '@heroicons/react/outline';

const Profile = () => {
  const { user, setUserDetails } = useUser(); // Access user data from the context
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  // Function to fetch user data from context or local storage
  const loadUserData = () => {
    if (user && user.email) {
      setEmail(user.email);
      setName(user.name || 'N/A'); // Assume there's a name field, otherwise use 'N/A'
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setEmail(parsedUser.email);
        setName(parsedUser.name || 'N/A');
      }
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from local storage
    setUserDetails(null, null); // Clear user data in context
    router.push('/login'); // Redirect to the sign-in page
  };

  // Load user data when the component is mounted
  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/background-pattern.jpg)' }}>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-8 md:mb-12">Your Profile</h1>
        <div className="w-full max-w-md bg-white bg-opacity-90 rounded-xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center mb-6 md:mb-8">
            <UserIcon className="h-6 md:h-8 w-6 md:w-8 text-blue-500 mb-2 md:mb-0 md:mr-4" />
            <p className="text-xl md:text-2xl font-semibold text-gray-700 text-center md:text-left break-words">Name: {name}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center mb-8 md:mb-10">
            <MailIcon className="h-6 md:h-8 w-6 md:w-8 text-blue-500 mb-2 md:mb-0 md:mr-4" />
            <p className="text-xl md:text-2xl font-semibold text-gray-700 text-center md:text-left break-words">Email: {email}</p>
          </div>
          <button
            className="w-full bg-gradient-to-r from-pink-500 to-red-600 text-white py-3 md:py-4 rounded-lg hover:shadow-lg transition-all duration-200 hover:from-red-600 hover:to-red-700"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
