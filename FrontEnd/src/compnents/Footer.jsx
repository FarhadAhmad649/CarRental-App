import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

function Footer() {
  // Parent container variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1, // Stagger columns
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="pt-12 pb-6 mt-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10 px-4">
        {/* Brand Column */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <img src={assets.logo} alt="Logo" className="h-7 mb-3" />
          <p className="text-sm text-gray-500 font-light leading-relaxed max-w-xs">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </p>
          <div className="flex gap-2 mt-5">
            {[
              assets.facebook_logo,
              assets.instagram_logo,
              assets.twitter_logo,
              assets.gmail_logo,
            ].map((icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:border-[#5f6fff] hover:bg-indigo-50 transition-all"
              >
                <img src={icon} alt="" className="w-3.5 h-3.5 opacity-50" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links Column */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-900 mb-4">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2.5">
            {[
              ["/", "Home"],
              ["/cars", "Cars"],
              ["/your-car", "Your Car"],
              ["/about", "About"],
            ].map(([href, label]) => (
              <li key={href}>
                <motion.a
                  whileHover={{ x: 5 }}
                  href={href}
                  className="text-sm text-gray-500 hover:text-[#5f6fff] transition-colors inline-block"
                >
                  {label}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Resources Column */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-900 mb-4">
            Resources
          </h3>
          <ul className="flex flex-col gap-2.5">
            {[
              ["/", "Help Center"],
              ["/cars", "Terms of Service"],
              ["/your-car", "Privacy Policy"],
              ["/about", "Insurance"],
            ].map(([href, label]) => (
              <li key={label}>
                <motion.a
                  whileHover={{ x: 5 }}
                  href={href}
                  className="text-sm text-gray-500 hover:text-[#5f6fff] transition-colors inline-block"
                >
                  {label}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Column */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-900 mb-4">
            Contact
          </h3>
          <ul className="flex flex-col gap-2.5">
            <li className="text-sm text-gray-500">1234 Luxury Drive</li>
            <li className="text-sm text-gray-500">San Francisco, CA 94938</li>
            <li>
              <motion.a
                whileHover={{ x: 5 }}
                href="tel:+923457834276"
                className="text-sm text-gray-500 hover:text-[#5f6fff] transition-colors inline-block"
              >
                +92 345 783 4276
              </motion.a>
            </li>
            <li>
              <motion.a
                whileHover={{ x: 5 }}
                href="mailto:info@example.com"
                className="text-sm text-gray-500 hover:text-[#5f6fff] transition-colors inline-block"
              >
                info@example.com
              </motion.a>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="border-t border-gray-100 pt-5 flex justify-between items-center"
      >
        <p className="text-xs text-gray-400">
          &copy; 2026 AutoLux. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 tracking-wide">Drive in style.</p>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
