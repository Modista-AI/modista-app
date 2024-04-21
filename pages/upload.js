
import Layout from '../components/Layout';
import { useState } from 'react';
import axios from 'axios';
import { CameraIcon, UploadIcon } from '@heroicons/react/outline'; // Ensure these icons are imported correctly
import { useRouter } from 'next/router';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const userEmail = "user@example.com"; // Replace with dynamic user email
  const router = useRouter();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }
    setUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('userEmail', userEmail);

    try {
      const response = await axios.post('http://localhost:3000/upload-and-analyze-clothing', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload Success:', response.data);
      // alert('Image uploaded and analysis started!');
      router.push('/closet'); // replace with your actual route

    } catch (error) {
      console.error('Upload Error:', error.response?.data?.error || error.message);
      alert('Upload failed!');
    } finally {
      setUploading(false);
    }
  };
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-pink-100 via-pink-300 to-pink-500">
        <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-xl">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">Upload Clothing</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-md">
                  {selectedFile ? (
                    <p className="text-sm text-gray-700 mt-4">{selectedFile.name}</p>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {/* <CameraIcon className="w-12 h-12 text-gray-400" /> */}
                      <p className="mt-1 text-sm text-gray-600">
                        <UploadIcon className="w-6 h-6 text-gray-600 mx-1" />
                        Click to upload
                      </p>
                    </div>
                  )}
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                capture // This attribute enables the direct capture from camera on devices
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors duration-200 shadow-md"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 01.33-2.217l1.745 1.036A6 6 0 006 12h-2z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                'Upload Image'
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
