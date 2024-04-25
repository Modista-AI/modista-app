// import Layout from '../components/Layout';
// import { useState } from 'react';
// import axios from 'axios';

// const Recommendations = () => {
//   const [input, setInput] = useState('');
//   const [recommendations, setRecommendations] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/recommend-clothing', {
//         userEmail: 'agatenashons@gmail.com', // Change to dynamically get user email
//         description: input,
//       });
//       setRecommendations(response.data.recommendation);
//     } catch (error) {
//       console.error('Error getting recommendations:', error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="p-4">
//         <h1 className="text-2xl font-bold text-center">Get Recommendations</h1>
//         <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4">
//           <input
//             type="text"
//             placeholder="Describe the occasion..."
//             className="w-full p-2 border rounded"
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button type="submit" className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-700">
//             Submit
//           </button>
//         </form>
//         {recommendations && (
//           <div className="mt-4">
//             <h2 className="text-xl font-bold">Recommendations:</h2>
//             <p>{recommendations}</p>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Recommendations;



// import Layout from '../components/Layout';
// import { useState } from 'react';
// import axios from 'axios';

// const Recommendations = () => {
//   const [input, setInput] = useState('');
//   const [recommendations, setRecommendations] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/recommend-clothing', {
//         userEmail: 'agatenashons@gmail.com', // This should be dynamically fetched
//         description: input,
//       });
//       // Parse the JSON from the string response
//       const jsonResponse = JSON.parse(response.data.recommendation.replace(/```json\n|\n```/g, ''));
//       setRecommendations(jsonResponse.recommended_outfit);
//       console.log(recommendations)
//     } catch (error) {
//       console.error('Error getting recommendations:', error);
//       setRecommendations([]);
//     }
//   };

//   return (
//     <Layout>
//       <div className="bg-gradient-to-br from-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center p-4">
//         <h1 className="text-3xl font-bold text-white text-center mb-6">Get Fashion Recommendations</h1>
//         <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-lg shadow-lg p-5">
//           <input
//             type="text"
//             placeholder="Describe the occasion..."
//             className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button type="submit" className="mt-4 w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition-colors duration-200">
//             Submit
//           </button>
//         </form>
//         {recommendations.length > 0 && (
//           <div className="mt-6 w-full max-w-4xl text-white">
//             <h2 className="text-2xl font-bold">Recommendations:</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               {recommendations.map((item, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
//                   <img src={item.image_url} alt={item.item_type} className="w-full h-64 object-cover rounded-lg"/>
//                   <div className="text-gray-800 text-sm mt-2">
//                     <h3 className="text-lg font-semibold">{item.item_type}</h3>
//                     <p>{item.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Recommendations;


// import Layout from '../components/Layout';
// import { useState } from 'react';
// import axios from 'axios';

// const Recommendations = () => {
//   const [input, setInput] = useState('');
//   const [recommendations, setRecommendations] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/recommend-clothing', {
//         userEmail: 'agatenashons@gmail.com', // Dynamically fetched ideally
//         description: input,
//       });
//       const jsonResponse = JSON.parse(response.data.recommendation.replace(/```json\n|\n```/g, ''));
//       setRecommendations(jsonResponse.recommended_outfit);
//     } catch (error) {
//       console.error('Error getting recommendations:', error);
//       setRecommendations([]);
//     }
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundImage: 'linear-gradient(to bottom right, #6658D3, #D158B8)', backgroundAttachment: 'fixed' }}>
//         <h1 className="text-4xl font-bold text-white text-center mb-6">Fashion Recommendations</h1>
//         <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 transform transition duration-500 hover:scale-105">
//           <input
//             type="text"
//             placeholder="What's the occasion?"
//             className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button type="submit" className="mt-4 w-full bg-purple-700 text-white py-3 rounded-xl hover:bg-purple-800 transition-all duration-300">
//             Discover Styles
//           </button>
//         </form>
//         {recommendations.length > 0 && (
//           <div className="mt-8 w-full max-w-4xl">
//             <h2 className="text-2xl font-bold text-white">Your Style Guide:</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//               {recommendations.map((item, index) => (
//                 <div key={index} className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
//                   <img src={item.image_url} alt={item.item_type} className="w-full h-48 object-cover"/>
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold">{item.item_type}</h3>
//                     <p className="text-gray-600">{item.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Recommendations;


import Layout from '../components/Layout';
import { useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post('http://localhost:3000/recommend-clothing', {
        userEmail: 'agatenashons@gmail.com',
        description: input,
      });
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
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Get Fashion Recommendations</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-lg shadow-lg p-5">
          <input
            type="text"
            placeholder="What's the occasion?"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="mt-4 w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition-colors duration-200">
            Submit
          </button>
        </form>
        {loading && (
          <div className="flex justify-center items-center">
            <div className="loader">💖</div>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="mt-6 w-full max-w-4xl text-white">
            <h2 className="text-2xl font-bold">Recommendations:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {recommendations.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img src={item.image_url} alt={item.item_type} className="w-full h-64 object-cover rounded-lg"/>
                  <div className="text-gray-800 text-sm mt-2">
                    <h3 className="text-lg font-semibold">{item.item_type}</h3>
                    <p>{item.description}</p>
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
