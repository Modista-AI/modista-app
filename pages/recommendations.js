
// pages/recommendations.js
import Layout from '../components/Layout';
import axios from 'axios';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { CircularProgress } from '@mui/material'; // Import a loading spinner from Material UI

const Recommendations = () => {
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser(); // Retrieve user context

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = getUserEmail();
    if (!userEmail) {
      alert('User email not found. Please log in again.');
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post('http://localhost:3000/recommend-clothing', {
        userEmail,
        description: input,
      });

      // Parse response data if necessary
      const jsonResponse = JSON.parse(response.data.recommendation.replace(/```json\n|\n```/g, ''));
      setRecommendations(jsonResponse.recommended_outfit);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setRecommendations([]);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-500 to-pink-500">
        <h1 className="text-4xl font-bold text-white text-center mb-8"> Recommendations</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-8">
          <input
            type="text"
            placeholder="What's the occasion?"
            className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
            Get Recommendations
          </button>
        </form>
        {loading && (
          <div className="mt-8">
            <CircularProgress color="inherit" /> {/* Replaced with a more relevant loading spinner */}
          </div>
        )}

{Array.isArray(recommendations) && recommendations.length > 0 && (
  <div className="mt-8 w-full max-w-5xl text-white">
    <h2 className="text-3xl font-bold mb-4">Recommended Outfits:</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
        >
          <img src={item.image_url} alt={item.item_type} className="w-full h-56 object-cover rounded-lg mb-4" />
          <div className="text-gray-800 text-center">
            <h3 className="text-xl font-semibold">{item.item_type}</h3>
            <p className="text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      </div>
    </Layout>
  );
};

export default Recommendations;
