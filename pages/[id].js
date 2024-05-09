
import Layout from '../components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ClothingItem = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchClothingItem(id);
    }
  }, [id]);

  const fetchClothingItem = async (itemId) => {
    try {
      const response = await axios.get(`https://modista-backend.onrender.com/clothing/${itemId}`);
      setItem(response.data.clothingItem);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clothing item:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Layout><div className="flex justify-center items-center h-screen"><div className="spinner"></div></div></Layout>;
  }

  if (!item) {
    return <Layout><div className="text-center py-10"><p>No item found.</p></div></Layout>;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-lg w-full">
          <img src={item.imageUrl} alt={item.style} className="w-full h-auto transform hover:scale-105 transition-transform duration-300"/>
          <div className="p-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{item.style}</h1>
            <p className="text-gray-600"><strong>Material:</strong> {item.material}</p>
            <p className="text-gray-600"><strong>Color:</strong> {item.color}</p>
            <p className="text-gray-600"><strong>Occasions:</strong> {item.occasions}</p>
            <p className="text-gray-600"><strong>Unique Features:</strong> {item.uniqueFeatures}</p>
            <p className="text-gray-600 mb-4"><strong>Recommended Combinations:</strong> {item.recommendedCombinations}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClothingItem;
