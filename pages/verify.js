// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { ArrowLeft } from "@phosphor-icons/react";
// import { Reclaim } from '@reclaimprotocol/js-sdk'; // Import the Reclaim SDK

// const Verify = () => {
//   const router = useRouter();
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");


//   const getVerificationReq = async () => {
//     console.log("step 1")
//     const APP_ID = "0xee96A638DE51C3070234709F816dCd87ddb4bc36";
//     const reclaimClient = new Reclaim.ProofRequest(APP_ID);
//     const providerIds = [
//         '62b39fe2-2814-4c61-8e90-651cb694de95', // Tweet  verifier Modista
//     ];

//     console.log("step 2")

//     await reclaimClient.buildProofRequest(providerIds[0])
//     const APP_SECRET ="0xf2df817e0261e514417bfffd89b27948063b31a1ad5876a43ed1b39cebd54757"  // your app secret key.
    
//     console.log("step 3")

//     reclaimClient.setSignature(
//         await reclaimClient.generateSignature(APP_SECRET)
//     )

//     console.log("step 4")

//     const { requestUrl, statusUrl } =
//       await reclaimClient.createVerificationRequest()

//       console.log("step 5")
//       console.log(requestUrl)
//     await reclaimClient.startSession({
//       onSuccessCallback: proof => {
//         console.log('Verification success', proof)
//         // Your business logic here
//         setToastMessage("Tweet Verification Successful");
//         setShowToast(true);
//       },
//       onFailureCallback: error => {
//         console.error('Verification failed', error)
//         // Your business logic here to handle the error
//         setToastMessage("Tweet Verification Failed");
//         setShowToast(true);
//       }
//     })
// };

//   return (
//     <section className="home-background h-screen flex flex-col p-5 xl:px-[200px]">
//       {showToast && (
//         <div style={{
//           position: 'fixed',
//           bottom: '20px',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           backgroundColor: 'black',
//           color: 'white',
//           padding: '10px',
//           borderRadius: '5px',
//           zIndex: 1000,
//         }}>
//           {toastMessage}
//         </div>
//       )}
//       <div className="flex justify-between">
//         <ArrowLeft size={24} color="#ffffff" onClick={() => router.replace("/home")} />
//         <h3 className="text-white text-lg">Tweet Verification</h3>
//         <span></span>
//       </div>
//       <div className="flex flex-col items-center mt-10">
//         <h5 className="text-xl text-white">Start Your Verification</h5>
//         <p className="text-white text-center mt-4">Click the button below to begin the Tweet verification process with Reclaim Protocol.</p>
//         <button
//           className="mt-10 bg-[#0795B0] text-white font-bold py-2 px-4 rounded"
//           onClick={getVerificationReq}
//         >
//           Begin Verification
//         </button>
//       </div>
//     </section>
//   );
// };

// export default Verify;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft } from '@phosphor-icons/react';
import { Reclaim } from '@reclaimprotocol/js-sdk';
import QRCode from 'qrcode.react'; // Import the QRCode component

const Verify = () => {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [verificationUrl, setVerificationUrl] = useState('');

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);

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
      onSuccessCallback: proof => {
        setToastMessage("Tweet Verification Successful");
        setShowToast(true);
      },
      onFailureCallback: error => {
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
        <span></span> {/* Placeholder for right-aligned items if needed */}
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
