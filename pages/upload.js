// import Layout from '../components/Layout';
// import { useState } from 'react';

// const Upload = () => {
//   const [file, setFile] = useState(null);
//   const [description, setDescription] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Implement the logic to handle file upload here
//     console.log('Submitting:', file, description);
//   };

//   return (
//     <Layout>
//       <div className="p-4">
//         <h1 className="text-2xl font-bold text-center">Upload Your Clothing</h1>
//         <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-4">
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-500
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-full file:border-0
//               file:text-sm file:font-semibold
//               file:bg-violet-50 file:text-violet-700
//               hover:file:bg-violet-100"
//           />
//           <textarea
//             placeholder="Add a description..."
//             className="mt-2 p-2 w-full h-24 border rounded"
//             onChange={(e) => setDescription(e.target.value)}
//           ></textarea>
//           <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
//             Upload
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Upload;


import Layout from '../components/Layout';
import { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userEmail', 'agatenashons@gmail.com'); // Change to dynamically get user email

    try {
      const response = await axios.post('http://localhost:3000/upload-and-analyze-clothing', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload Success:', response.data);
      alert('Upload and analysis successful!');
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Upload failed!');
    }

    setUploading(false);
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">Upload Your Clothing</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />
          <textarea
            placeholder="Add a description..."
            className="mt-2 p-2 w-full h-24 border rounded"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Upload;

