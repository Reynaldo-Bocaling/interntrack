import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const LandingPage = lazy(() => import("./pages/landingPage/index"));
const PrivateRoutes = lazy(()=> import("./auth/PrivateRoutes"));
import { pdfjs } from "react-pdf";
const AddAdminModal = lazy(() => import("./components/addAdmin/AddAdminModal"));
const List = lazy(() => import("./components/print-layout/List"));
import { BarLoading } from "./components/spinners-loading/Spinner";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const App = () => {
  return (
    <Routes>
      <Suspense fallback={<BarLoading/>}>
      <Route path="/*" element={<PrivateRoutes />} />
      </Suspense>
      

      <Route
        path="/welcome-to-InternTrack"
        element={
          <Suspense fallback={<BarLoading/>}>
            <LandingPage />
          </Suspense>
        }
      />
      <Route
        path="/weekly"
        element={
          <Suspense fallback={<BarLoading/>}>
            <List />
          </Suspense>
        }
      />
      <Route
        path="/@super-admin"
        element={
          <Suspense fallback={<BarLoading/>}>
            <AddAdminModal />
          </Suspense>
        }
      />
    </Routes>
    // </Suspense>
  );
};

export default App;
