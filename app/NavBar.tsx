// NavBar.tsx
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
// import styles from './Styles/navbar.module.css';
import UserDropdown from "./Components/userDropdown";

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [fullname, setFullname] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedFullname = localStorage.getItem("fullname");
    const storedRole = localStorage.getItem("role");
    if (storedFullname) {
      setFullname(storedFullname);
    }
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fullname");
    localStorage.removeItem("role");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("providerID");
    window.location.href = "/users/login"; // Redirect to login page after logout
  };

  const links = [
    { label: "HOME", href: "/" },
    { label: "DOCTORS", href: "/doctors" },
    { label: "HOSPITALS", href: "/facilities" },
    { label: "REGISTER", href: "/register" },
  ];

  return (
    <>
      {isNavOpen && (
        <div className="h-[100dvh] lg:hidden fixed inset-0 w-[78%] bg-[#0B3C41] ">
          <div className=" flex flex-col pt-20">
            {links.map((link) => (
              <Link
                className=" hover:bg-white text-center border border-gray-700 shadow-md text-white hover:text-[#0B3C41] py-3 m-3 rounded-lg"
                key={link.label}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
            <div className=" flex flex-col items-center  mt-5 space-y-5">
              <Link href="/users/login">
                <div className=" px-12 py-2 w-fit text-center text-black rounded-lg">
                  LOGIN
                </div>
              </Link>
              <Link href="/users/signup">
                <div className=" bg-cyan-800 w-fit text-center text-white rounded-lg px-12 py-2">
                  Sign Up
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
      <nav className="flex sticky z-10  w-full items-center justify-between mb-3 h-14">
        <div className="flex items-center">
          <Link href="/">
            <h3 className=" text-[28px] font-bold">
              <span
                className={`${
                  isNavOpen ? ` text-gray-400` : `text-[#0B3C41]/30`
                }`}
              >
                Care.
              </span>
              <span
                className={`${isNavOpen ? ` text-white` : `text-[#0B3C41]`}`}
              >
                Connect
              </span>
            </h3>
          </Link>
        </div>
        <ul className="hidden lg:flex flex-1 justify-center lg:space-x-6 ml-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className="text-zinc-800 text-[18px] hover:text-zinc-500"
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className=" hidden lg:flex space-x-3 items-center">
          {fullname ? (
            <UserDropdown
              fullname={fullname}
              role={role!}
              handleLogout={handleLogout}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          ) : (
            <>
              <Link
                className=" px-6 py-2 border border-x-teal-800 hover:shadow-md text-black rounded-lg"
                href="/users/login"
              >
                LOGIN
              </Link>
              <Link
                href="/users/signup"
                className="bg-[#0B3C41] text-white rounded-lg px-6 hover:shadow-md py-2 ml-3"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        <button className="lg:hidden" onClick={() => setIsNavOpen(!isNavOpen)}>
          <svg
            className="md:w-12 w-10  md:h-12 h-10 text-[#0B3C41]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isNavOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </nav>
    </>
  );
}

export default NavBar;
