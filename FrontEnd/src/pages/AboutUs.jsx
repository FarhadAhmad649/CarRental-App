import React from "react";
import { assets } from "../assets/assets";

const AboutUs = () => {
  return (
    <div className="">
      {/* --- Title Section --- */}
      <div className="text-center text-2xl pt-10 border-t border-gray-200">
        <h2 className="text-gray-800 uppercase font-semibold tracking-wide underline">
          About <span className="text-gray-500 font-light">Us</span>
        </h2>
      </div>

      {/* --- Main Content Section --- */}
      <div className="my-10 flex flex-col md:flex-row gap-12 items-center">
        {/* About Image */}
        <img
          className="w-full md:min-w-[450px] md:min-h-[400px] rounded-2xl shadow-lg"
          src={
            assets.about_img ||
            "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000"
          }
          alt="About CarRental"
        />

        {/* Text Content */}
        <div className="flex flex-col justify-center gap-3 md:w-2/4 text-gray-600 leading-relaxed">
          <p>
            Welcome to{" "}
            <span className="font-bold text-blue-600">CarRental</span>, your
            trusted partner in exploring the roads with comfort and style. We
            started with a simple vision: to make car hiring as easy as a few
            clicks, especially for locals and tourists in the beautiful region
            of Abbottabad.
          </p>
          <p>
            Whether you need a sleek{" "}
            <span className="font-medium text-gray-800">Sedan</span> for
            business, a rugged{" "}
            <span className="font-medium text-gray-800">SUV</span> for a trip to
            the northern mountains, or a{" "}
            <span className="font-medium text-gray-800">Luxury</span> vehicle
            for a special event, our diverse fleet is maintained to the highest
            standards of safety and performance.
          </p>
          <b className="text-gray-800 text-lg">Our Mission</b>
          <p>
            Our mission is to revolutionize the local transport industry by
            leveraging modern AI and MERN technology to provide a seamless,
            transparent, and user-friendly booking experience for everyone.
          </p>
        </div>
      </div>

      {/* --- Why Choose Us Section --- */}
      <div className="text-xl py-4">
        <h3 className="text-gray-800 font-semibold">
          Why <span className="text-gray-500 font-light">Choose Us?</span>
        </h3>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 gap-4">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-default group">
          <b className="">Quality Assurance:</b>
          <p>
            We meticulously inspect every vehicle in our fleet to ensure your
            journey is safe and breakdown-free.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 rounded-xl hover:bg-gray-100  transition-all duration-300 cursor-default group">
          <b className="">Convenience:</b>
          <p>
            With our intuitive MERN-powered interface, booking your dream car
            takes less than 60 seconds.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 rounded-xl hover:bg-gray-100  transition-all duration-300 cursor-default group">
          <b className="">Personalized Service:</b>
          <p>
            Our team provides 24/7 support to ensure your rental experience
            exceeds all expectations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
