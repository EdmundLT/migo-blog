import React from "react";
import Banner from "../components/Banner";
import "styles/globals.css";
import Footer from "../components/Footer";
const about = () => {
  return (
    <div className="max-w-full mx-auto bg-white">
      <div className="max-w-7xl mx-auto">
        <Banner />
        <div className="text-black">
          <p>about</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
