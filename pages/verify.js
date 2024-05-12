
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { ArrowLeft } from '@phosphor-icons/react';
// import { Reclaim } from '@reclaimprotocol/js-sdk';
// import QRCode from 'qrcode.react';

// const Verify = () => {
//   const router = useRouter();
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [isMobile, setIsMobile] = useState(false);
//   const [verificationUrl, setVerificationUrl] = useState('');
//   const [email, setEmail] = useState('');

//   const loadUserData = () => {
   
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         const parsedUser = JSON.parse(storedUser);
//         setEmail(parsedUser.email);
//         console.log(email)
//       }
//     }
  

//   useEffect(() => {
//     const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//     if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())) {
//       setIsMobile(true);
//     }
//   }, []);

//   useEffect(() => {
//     loadUserData();
//   }, []);

//   const sendVerificationData = async (tweetText) => {
//     // const email = localStorage.getItem('email'); // Retrieve the user's email from local storage
//     const hasArbitrum = tweetText.includes("#modista");

//     try {
//       const response = await fetch('http://localhost:3000/verifyTweet', { // Assuming you are using a proxy or have set the full API URL
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ tweetText, email, hasArbitrum })
//       });

//       const data = await response.json();
//       console.log(data.message); // Log server response
//     } catch (error) {
//       console.error('Failed to send verification data:', error);
//     }
//   };

//   const getVerificationReq = async () => {
//     console.log("Initializing Reclaim SDK");
//     const APP_ID = "0xee96A638DE51C3070234709F816dCd87ddb4bc36";
//     const reclaimClient = new Reclaim.ProofRequest(APP_ID);
//     const providerIds = ['62b39fe2-2814-4c61-8e90-651cb694de95'];

//     await reclaimClient.buildProofRequest(providerIds[0]);
//     const APP_SECRET = "0xf2df817e0261e514417bfffd89b27948063b31a1ad5876a43ed1b39cebd54757";

//     reclaimClient.setSignature(await reclaimClient.generateSignature(APP_SECRET));
//     const { requestUrl } = await reclaimClient.createVerificationRequest();
//     console.log(requestUrl);
//     setVerificationUrl(requestUrl);

//     reclaimClient.startSession({
//         onSuccessCallback: async proof => {
//             console.log('Verification success', proof);
//             try {
//                 const contextString = proof[0].claimData.context;
//                 const contextObject = JSON.parse(contextString);
//                 const tweetText = contextObject.extractedParameters.tweet;
//                 console.log("Extracted Tweet Text:", tweetText);
//                 sendVerificationData(tweetText); // Send data to the server
//                 setToastMessage("Tweet Verification Successful: " + tweetText);
//                 setShowToast(true);
//             } catch (error) {
//                 console.error("Error parsing tweet data:", error);
//                 setToastMessage("Failed to extract tweet");
//                 setShowToast(true);
//             }
//         },
//         onFailureCallback: error => {
//             console.error('Verification failed', error);
//             setToastMessage("Tweet Verification Failed");
//             setShowToast(true);
//         }
//     });
//   };

//   return (
//     <section className="bg-gradient-to-r from-indigo-500 to-blue-500 h-screen flex flex-col px-5 xl:px-40">
//       {showToast && (
//         <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded-lg z-10 ${showToast ? 'block' : 'hidden'}`}>
//           {toastMessage}
//         </div>
//       )}
//       <div className="flex justify-between items-center mt-5">
//         <ArrowLeft size={24} color="#ffffff" onClick={() => router.replace("/home")} />
//         <h3 className="text-white text-lg font-bold">Tweet Verification</h3>
//       </div>
//       <div className="flex flex-col items-center justify-center flex-grow">
//         <h5 className="text-2xl text-white font-bold">Start Your Verification</h5>
//         <p className="text-white text-center mt-4">Click the button below to begin the Tweet verification process with Reclaim Protocol.</p>
//         <button
//           className="mt-10 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
//           onClick={getVerificationReq}
//         >
//           Begin Verification
//         </button>
//         {!isMobile && verificationUrl && (
//           <div className="mt-10 text-center">
//             <p className="text-white mb-2">Scan this QR code with your mobile device to continue:</p>
//             <QRCode value={verificationUrl} size={128} level={"H"} includeMargin={true} />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Verify;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft } from '@phosphor-icons/react';
import { Reclaim } from '@reclaimprotocol/js-sdk';
import QRCode from 'qrcode.react';

const Verify = () => {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [verificationUrl, setVerificationUrl] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setEmail(parsedUser.email);
    }
  }, []);

  const sendVerificationData = async (tweetText) => {
    const hasArbitrum = tweetText.includes("#modista");
    try {
      const response = await fetch('https://modista-backend.vercel.app/verifyTweet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetText, email, hasArbitrum })
      });
      const data = await response.json();
      if (data) {
        console.log(data.message); // Log server response
        setToastMessage(data.message);
        setShowToast(true);
        router.push('/profile'); // Redirect to profile page after successful verification
      }
    } catch (error) {
      console.error('Failed to send verification data:', error);
      setToastMessage("Failed to send verification data");
      setShowToast(true);
    }
  };

  const getVerificationReq = async () => {
    console.log("Initializing Reclaim SDK");
    const APP_ID = "0xee96A638DE51C3070234709F816dCd87ddb4bc36";
    const reclaimClient = new Reclaim.ProofRequest(APP_ID);
    const providerIds = ['62b39fe2-2814-4c61-8e90-651cb694de95'];

    await reclaimClient.buildProofRequest(providerIds[0]);
    const APP_SECRET = "0xf2df817e0261e514417bfffd89b27948063b31a1ad5876a43ed1b39cebd54757";

    reclaimClient.setSignature(await reclaimClient.generateSignature(APP_SECRET));
    const { requestUrl } = await reclaimClient.createVerificationRequest();
    console.log(requestUrl);
    setVerificationUrl(requestUrl);

    reclaimClient.startSession({
      onSuccessCallback: async proof => {
        console.log('Verification success', proof);
        const contextString = proof[0].claimData.context;
        const contextObject = JSON.parse(contextString);
        const tweetText = contextObject.extractedParameters.tweet;
        console.log("Extracted Tweet Text:", tweetText);
        sendVerificationData(tweetText); // Send data to the server and handle redirection inside
      },
      onFailureCallback: error => {
        console.error('Verification failed', error);
        setToastMessage("Tweet Verification Failed");
        setShowToast(true);
      }
    });
  };

  return (
    <section className="bg-gradient-to-r from-indigo-500 to-blue-500 h-screen flex flex-col px-5 xl:px-40">
      {showToast && (
        <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded-lg z-10 ${showToast ? 'block' : 'hidden'}`}>
          {toastMessage}
        </div>
      )}
      <div className="flex justify-between items-center mt-5">
        <ArrowLeft size={24} color="#ffffff" onClick={() => router.replace("/home")} />
        <h3 className="text-white text-lg font-bold">Tweet Verification</h3>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <h5 className="text-2xl text-white font-bold">Start Your Verification</h5>
        <p className="text-white text-center mt-4">Click the button below to begin the Tweet verification process with Reclaim Protocol.</p>
        <button
          className="mt-10 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          onClick={getVerificationReq}
        >
          Begin Verification
        </button>
        {!isMobile && verificationUrl && (
          <div className="mt-10 text-center">
            <p className="text-white mb-2">Scan this QR code with your mobile device to continue:</p>
            <QRCode value={verificationUrl} size={128} level={"H"} includeMargin={true} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Verify;
