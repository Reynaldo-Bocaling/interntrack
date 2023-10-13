import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
const LandingPage = lazy(() => import("./pages/landingPage/index"));
const PrivateRoutes = lazy(() => import("./auth/PrivateRoutes"));


const  App = () => {
  return (
    <Suspense
      fallback={
        <div className="fixed top-0 l-20 h-screen w-full bg-white flex mt-32 justify-center">
          <div className="flex flex-col gap-4">
            <PulseLoader
              color="#03A8F5"
              margin={8}
              size={15}
              speedMultiplier={1}
            />

            <span className="text-gray-400 text-2xl tracking-wider font-medium">
              Loading..
            </span>
          </div>
        </div>
      }
    >
      <Routes>
        <Route path="/welcome-to-InternTrack" element={<LandingPage />} />
        <Route path="/*" element={<PrivateRoutes />} />
      </Routes>
    </Suspense>
  );
}

export default App;
