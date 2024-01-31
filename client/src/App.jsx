import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const LandingPage = lazy(() => import("./pages/landingPage/index"));
const PrivateRoutes =  lazy(()=> import("./auth/PrivateRoutes"));
import { pdfjs } from "react-pdf";
const AddAdminModal = lazy(() => import("./components/addAdmin/AddAdminModal"));
const List = lazy(() => import("./components/print-layout/List"));
import { Spinner } from "./components/spinners-loading/Spinner";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<PrivateRoutes />} />

      <Route
        path="/welcome-to-InternTrack"
        element={
          <Suspense fallback={<Spinner/>}>
            <LandingPage />
          </Suspense>
        }
      />
      <Route
        path="/weekly"
        element={
          <Suspense fallback={<Spinner/>}>
            <List />
          </Suspense>
        }
      />
      <Route
        path="/@super-admin"
        element={
          <Suspense fallback={<Spinner/>}>
            <AddAdminModal />
          </Suspense>
        }
      />
    </Routes>
    // </Suspense>
  );
};

export default App;
