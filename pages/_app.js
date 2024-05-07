// import '../styles/globals.css'
// import { UserProvider } from '../context/UserContext'
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import '../styles/globals.css'
import { UserProvider } from '../context/UserContext'; // adjust the path as needed

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
