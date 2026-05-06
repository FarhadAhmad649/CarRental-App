import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";


const Contact = () => {

    const navigate = useNavigate()
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-light tracking-wide text-gray-800">
          CONTACT <span className="font-bold">US</span>
        </h2>
      </div>

      {/* Content Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left: Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.car11}
            alt="Doctor with patient"
            className="w-full h-auto object-cover rounded-sm shadow-sm"
          />
        </div>

        {/* Right: Info Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-2 text-gray-600">
          {/* Office Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1 uppercase tracking-wider">
              Our Office
            </h3>
            <div className=" leading-relaxed">
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>
            </div>
            <div className="mt-2 space-y-1">
              <p>Tel: (415) 555-0132</p>
              <p>Email: greatstackdev@gmail.com</p>
            </div>
          </div>

          {/* Careers Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1 uppercase tracking-wider">
              Careers at Car Rental
            </h3>
            <p className="mb-6 leading-relaxed">
              Learn more about our models and services.
            </p>
            <button onClick={()=> navigate('/cars')} className="border border-black px-8 py-3 text-sm hover:bg-[#5f6fff] hover:text-white transition-all duration-300">
              Explore Cars
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
