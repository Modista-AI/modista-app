// import Layout from '../components/Layout';

// const Home = () => {
//   return (
//     <Layout>
//       <div className="p-4 text-center">
//         <h1 className="text-2xl font-bold">Welcome to Fashion Finder</h1>
//         <p>Explore, upload, and get recommendations on your clothing style!</p>
//         <div className="mt-4 space-x-2">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 md:px-6 md:py-3 md:text-lg"
// >Upload Your Clothing</button>
//           <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 md:px-6 md:py-3 md:text-lg"
// >View Your Closet</button>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Home;

// import Layout from '../components/Layout';

// const Home = () => {
//   return (
//     <Layout>
//       <div className="flex flex-col items-center justify-center h-screen bg-cream text-center">
//         <h1 className="text-3xl font-bold text-purple mb-2">Welcome to Fashion Finder</h1>
//         <p className="text-grey-700 mb-4">Explore, upload, and get recommendations on your clothing style!</p>
//         <div className="flex flex-col space-y-4 mt-4">
//           <button className="bg-purple text-white px-6 py-3 rounded-lg shadow hover:bg-purple-dark"
//             onClick={() => alert('Upload functionality coming soon!')}>
//             Upload Your Clothing
//           </button>
//           <button className="bg-coral text-white px-6 py-3 rounded-lg shadow hover:bg-coral-dark"
//             onClick={() => alert('Closet view coming soon!')}>
//             View Your Closet
//           </button>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Home;

// import Layout from '../components/Layout';

// const Home = () => {
//   return (
//     <Layout>
//       <div className="relative flex flex-col items-center justify-center h-screen text-center overflow-hidden">
//         {/* Video Background */}
//         <video autoPlay muted loop playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
//           <source src="/modistahome.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
        
//         {/* Overlay to improve text visibility */}
//         <div className="absolute z-10 w-full h-full bg-black opacity-50"></div>
        
//         {/* Content */}
//         <div className="relative z-20 p-4">
//           <h1 className="text-3xl font-bold text-white mb-2">Welcome to Fashion Finder</h1>
//           <p className="text-white mb-4">Explore, upload, and get recommendations on your clothing style!</p>
//           <div className="flex flex-col space-y-4 mt-4">
//             <button className="bg-purple text-white px-6 py-3 rounded-lg shadow hover:bg-purple-dark"
//               onClick={() => alert('Upload functionality coming soon!')}>
//               Upload Your Clothing
//             </button>
//             <button className="bg-coral text-white px-6 py-3 rounded-lg shadow hover:bg-coral-dark"
//               onClick={() => alert('Closet view coming soon!')}>
//               View Your Closet
//             </button>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Home;


import Layout from '../components/Layout';
import { useRouter } from 'next/router'; // Import the useRouter hook

const Home = () => {

  const router = useRouter(); // Initialize the router

  // Function to navigate to the upload page
  const goToUpload = () => {
    router.push('/upload'); // Adjust the path to your upload page's route
  };

  // Function to navigate to the closet page
  const goToCloset = () => {
    router.push('/closet'); // Adjust the path to your closet page's route
  };
  return (
    <Layout>
      <div className="relative flex flex-col items-center justify-center h-screen text-center overflow-hidden">
        {/* Video Background */}
        <video autoPlay muted loop playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
          <source src="/modistahome.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay to improve text visibility */}
        <div className="absolute z-10 w-full h-full bg-black opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-20 p-4">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Modista</h1>
          <p className="text-white mb-4">Explore, upload, and get recommendations on your clothing style!</p>
          <div className="flex flex-col space-y-4 mt-4">
          
            <button className="text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out"
  style={{
    backgroundImage: 'linear-gradient(to right, #9D50BB, #6E48AA)', // Example gradient
    hover: {
      boxShadow: '0 10px 15px -3px rgba(156, 50, 186, 0.5)',
      backgroundImage: 'linear-gradient(to right, #7B1FA2, #4A148C)' // Darker gradient on hover
    }
  }}
  onClick={goToUpload}>
  Upload Your Clothing
</button>

            <button className="text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
  style={{
    backgroundImage: 'linear-gradient(to right, #FF6B6B, #FF8787)', // This sets the gradient colors for coral
  }}
  onMouseOver={e => e.currentTarget.style.backgroundImage = 'linear-gradient(to right, #E63946, #FF4D6D)'} // Darker gradient on hover
  onMouseOut={e => e.currentTarget.style.backgroundImage = 'linear-gradient(to right, #FF6B6B, #FF8787)'} // Revert to original gradient
  onClick={goToCloset}>
  View Your Closet
</button>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
