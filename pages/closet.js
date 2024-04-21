// import Layout from '../components/Layout';
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const Closet = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCloset = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/user-closet', { params: { email: 'agatenashons@gmail.com' } }); // Change to dynamically get user email
//         setItems(response.data.closet);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching closet:', error);
//         setLoading(false);
//       }
//     };

//     fetchCloset();
//   }, []);

//   return (
//     <Layout>
//       <div className="p-4">
//         <h1 className="text-2xl font-bold text-center">My Closet</h1>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
//             {items.map((item, index) => (
//               <div key={index} className="border p-2">
//                 <img src={item.imageUrl} alt={item.description} className="w-full h-auto" />
//                 <p>{item.description}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Closet;


// import Layout from '../components/Layout';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// const Closet = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCloset = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/user-closet', {
//           params: { email: 'agatenashons@gmail.com' } // This should be dynamically set
//         });
//         setItems(response.data.closet);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching closet:', error);
//         setLoading(false);
//       }
//     };

//     fetchCloset();
//   }, []);

//   const handleItemClick = (id) => {
//     router.push(`/${id}`); // Route to clothing item detail page
//   };

//   return (
//     <Layout>
//       <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">My Closet</h1>
//         {loading ? (
//           <p className="text-center text-gray-600">Loading...</p>
//         ) : (
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//             {items.map((item) => (
//               <div key={item._id} className="cursor-pointer border p-2 rounded-lg shadow hover:shadow-md transition-shadow" onClick={() => handleItemClick(item._id)}>
//                 <img src={item.imageUrl} alt={item.description} className="w-full h-40 object-cover rounded" />
//                 <div className="mt-2">
//                   <p className="text-sm font-semibold truncate">{item.style}</p>
//                   <p className="text-xs text-gray-600">{item.material}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Closet;



import Layout from '../components/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Closet = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCloset = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user-closet', {
          params: { email: 'agatenashons@gmail.com' } // This should dynamically fetch user email
        });
        setItems(response.data.closet);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching closet:', error);
        setLoading(false);
      }
    };

    fetchCloset();
  }, []);

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
                  <img src={item.imageUrl} alt={item.description} className="w-full h-40 object-cover" onClick={() => handleItemClick(item._id)} />
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

