import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="max-w-full flex flex-col no-scrollbar">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
