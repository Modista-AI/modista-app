import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4 justify-center">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/closet">My Closet</Link></li>
          <li><Link href="/upload">Upload Clothing</Link></li>
          <li><Link href="/recommendations">Recommendations</Link></li>
          <li><Link href="/signin">Sign In/Out</Link></li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
