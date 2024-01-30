import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
const LandingPage = lazy(() => import("./pages/landingPage/index"));
const PrivateRoutes = lazy(() => import("./auth/PrivateRoutes"));

import { pdfjs } from "react-pdf";
import AddAdminModal from "./components/addAdmin/AddAdminModal";
import { Spinner } from "./components/spinners-loading/Spinner";
const List = lazy(()=> import("./components/print-layout/List"))

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const App = () => {
  return (
    <Suspense
      fallback={
        <Spinner />
      }
    >
      <Routes>
        <Route path="/welcome-to-InternTrack" element={<LandingPage />} />
        <Route path="/*" element={<PrivateRoutes />} />
        <Route path="/weekly" element={<List />} />
        <Route path="/@super-admin" element={<AddAdminModal />} />
      </Routes>
    </Suspense>
  );
};

export default App;
