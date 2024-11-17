import React from "react";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-primary text-white p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Spoturf
        </p>
      </aside>
    </footer>
  );
}
