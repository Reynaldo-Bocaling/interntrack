import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import Features from "./Features";
import WhatWeDo from "./WhatWeDo";
import Services from "./Services";
import HeaderFooter from "./HeaderFooter";
import { IoIosArrowUp } from "react-icons/io";
function index() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="shadow-effect relative w-screen min-h-screen bg-white overflow-x-hidden">
      <div className="max-w-[1124px] mx-auto ">
        <Navbar />
        <Home />
        <WhatWeDo />
        <About />
        <Features />
        <Services />
        <HeaderFooter />
        <Footer />

        {isVisible && (
          <button
            className="scrollUpButton h-[45px] w-[45px] flex items-center justify-center rounded-full fixed bottom-5 right-5 z-50 bg-white shadow-lg border"
            onClick={scrollToTop}
          >
            <IoIosArrowUp />
          </button>
        )}
      </div>
    </div>
  );
}

export default index;
