// import Link from 'next/link';

// const Layout = ({ children }) => {
//   return (
//     <>
//       <nav className="bg-gray-800 text-white p-4">
//         <ul className="flex space-x-4 justify-center">
//           <li><Link href="/">Home</Link></li>
//           <li><Link href="/closet">My Closet</Link></li>
//           <li><Link href="/upload">Upload Clothing</Link></li>
//           <li><Link href="/recommendations">Recommendations</Link></li>
//           <li><Link href="/signin">Sign In/Out</Link></li>
//         </ul>
//       </nav>
//       <main>{children}</main>
//     </>
//   );
// };

// export default Layout;


import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HomeIcon, ArchiveIcon, CloudUploadIcon, LightBulbIcon, UserIcon } from '@heroicons/react/outline'; // Ensure these are correctly named

const Layout = ({ children }) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState('');

  useEffect(() => {
    // Update active state based on route changes
    setIsActive(router.pathname);
  }, [router.pathname]);

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 bg-gray-800 text-white p-4 z-50 shadow-lg">
        <ul className="flex justify-around">
          <li className={isActive === '/' ? 'text-blue-500' : 'text-gray-300'}>
            <Link href="/">
              <p className="block text-center">
                <HomeIcon className="h-6 w-6 mx-auto" />
                <span className="text-xs">Home</span>
              </p>
            </Link>
          </li>
          <li className={isActive === '/closet' ? 'text-blue-500' : 'text-gray-300'}>
            <Link href="/closet">
              <p className="block text-center">
                <ArchiveIcon className="h-6 w-6 mx-auto" />
                <span className="text-xs">Closet</span>
              </p>
            </Link>
          </li>
          <li className={isActive === '/upload' ? 'text-blue-500' : 'text-gray-300'}>
            <Link href="/upload">
              <p className="block text-center">
                <CloudUploadIcon className="h-6 w-6 mx-auto" />
                <span className="text-xs">Upload</span>
              </p>
            </Link>
          </li>
          <li className={isActive === '/recommendations' ? 'text-blue-500' : 'text-gray-300'}>
            <Link href="/recommendations">
              <p className="block text-center">
                <LightBulbIcon className="h-6 w-6 mx-auto" />
                <span className="text-xs">Finds</span>
              </p>
            </Link>
          </li>
          <li className={isActive === '/signin' ? 'text-blue-500' : 'text-gray-300'}>
            <Link href="/signin">
              <p className="block text-center">
                <UserIcon className="h-6 w-6 mx-auto" />
                <span className="text-xs">Sign In/Out</span>
              </p>
            </Link>
          </li>
        </ul>
      </nav>
      <main className="pt-16 min-h-screen">{children}</main>
    </>
  );
};

export default Layout;
