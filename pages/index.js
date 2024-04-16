import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Welcome to Fashion Finder</h1>
        <p>Explore, upload, and get recommendations on your clothing style!</p>
        <div className="mt-4 space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 md:px-6 md:py-3 md:text-lg"
>Upload Your Clothing</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 md:px-6 md:py-3 md:text-lg"
>View Your Closet</button>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
