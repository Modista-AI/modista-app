import Layout from '../components/Layout';
import { useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/recommend-clothing', {
        userEmail: 'agatenashons@gmail.com', // Change to dynamically get user email
        description: input,
      });
      setRecommendations(response.data.recommendation);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">Get Recommendations</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4">
          <input
            type="text"
            placeholder="Describe the occasion..."
            className="w-full p-2 border rounded"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-700">
            Submit
          </button>
        </form>
        {recommendations && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Recommendations:</h2>
            <p>{recommendations}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Recommendations;
