
// pages/closet.js
import Layout from '../components/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

const Closet = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser(); // Retrieve the user from the context
  const router = useRouter();

  // Function to get the email from context or local storage
  const getUserEmail = () => {
    if (user && user.email) {
      return user.email;
    }
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser.email;
    }
    return null;
  };

  useEffect(() => {
    const fetchCloset = async () => {
      const email = getUserEmail();
      if (!email) {
        console.error('User email not found. Redirecting to login...');
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('https://modista-backend.onrender.com/user-closet', {
          params: { email }
        });
        setItems(response.data.closet);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching closet:', error);
        setLoading(false);
      }
    };

    fetchCloset();
  }, [router]);

  const handleItemClick = (id) => {
    router.push(`/${id}`); // Ensure the route matches your setup for clothing item details
  };

  return (
    <Layout>
      <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-700 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-white mb-6">My Fashion Closet</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div> {/* Consider adding a CSS spinner or loader animation here */}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {items.map((item) => (
              <div key={item._id} className="cursor-pointer transform hover:scale-105 transition-transform duration-300">
                <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl">
                  <img
                    src={item.imageUrl}
                    alt={item.description}
                    className="w-full h-40 object-cover"
                    onClick={() => handleItemClick(item._id)}
                  />
                  <div className="p-3 bg-white">
                    <p className="text-sm font-semibold truncate">{item.style}</p>
                    <p className="text-xs text-gray-600">{item.material}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Closet;
