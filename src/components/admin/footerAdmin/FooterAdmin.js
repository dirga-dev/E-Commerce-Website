import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation().pathname;
  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  return (
    <>
      <footer className="bg-zinc-100 pt-24 pb-12 border-t-2 ">
          <div className="w-full border-t border-primary pt-10">
            <p className="text-center text-xs font-medium text-slate-500">
              FINAL PROJECT II REACT AND REACT NATIVE HACKTIV8 STUDI INDEPENDEN BERSERTIFIKAT KAMPUS MERDEKA
            </p>
          </div>
      </footer>
    </>
  );
};

export default Footer;
