import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/index";
// const PrivateRoutes = lazy(() => import("./auth/PrivateRoutes"));
import PrivateRoutes from "./auth/PrivateRoutes";
import { pdfjs } from "react-pdf";
import AddAdminModal from "./components/addAdmin/AddAdminModal";
import List from "./components/print-layout/List";
import { Spinner } from "./components/spinners-loading/Spinner";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const App = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
         
            <PrivateRoutes />
       
        }
      />
      <Route path="/welcome-to-InternTrack" element={<LandingPage />} />
      <Route path="/weekly" element={<List />} />
      <Route path="/@super-admin" element={<AddAdminModal />} />
    </Routes>
    // </Suspense>
  );
};

export default App;
