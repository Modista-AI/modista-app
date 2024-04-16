import Layout from '../components/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Closet = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCloset = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user-closet', { params: { email: 'agatenashons@gmail.com' } }); // Change to dynamically get user email
        setItems(response.data.closet);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching closet:', error);
        setLoading(false);
      }
    };

    fetchCloset();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">My Closet</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {items.map((item, index) => (
              <div key={index} className="border p-2">
                <img src={item.imageUrl} alt={item.description} className="w-full h-auto" />
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Closet;