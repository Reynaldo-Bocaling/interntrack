import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// public routes
const LandingPage = lazy(() => import("./pages/landingPage/index"));
const PrivateRoutes = lazy(() => import("./auth/ProtectedRoutes"));

function App() {
  return (
    <Suspense fallback={<h1>Loading..</h1>}>
      <Routes>
        <Route path="/welcome-to-InternTrack" element={<LandingPage />} />
        <Route path="*" element={<PrivateRoutes />} />
      </Routes>
    </Suspense>
  );
}

export default App;
