import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../Usercontext";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <main className=" text-white">
        <header className="flex justify-between">
          <Link to={"/"}>
            <a className="flex items-center gap-1" src="">
              <svg
                width="40"
                height="30"
                viewBox="0 0 320 248"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_61_47)">
                  <path
                    d="M288 246L0 248V199C3.15543 199.013 6.28224 198.401 9.20003 197.2C12.1178 195.999 14.7688 194.231 17.0001 192C19.2313 189.769 20.9986 187.118 22.2001 184.2C23.4015 181.282 24.0132 178.155 24 175C24.1078 171.864 23.5527 168.742 22.371 165.835C21.1894 162.929 19.4078 160.305 17.1426 158.134C14.8775 155.963 12.1798 154.295 9.22581 153.238C6.27184 152.181 3.1281 151.759 0 152V103L288 102V150C281.772 150.417 275.907 153.079 271.493 157.493C267.079 161.907 264.417 167.772 264 174C264.01 179.882 266.14 185.562 270 190C272.293 192.494 275.074 194.491 278.17 195.867C281.266 197.243 284.612 197.969 288 198V246Z"
                    fill="#ACF600"
                  />
                  <path d="M242 121V108H235V121H242Z" fill="#FCFCFC" />
                  <path d="M242 145V132H235V145H242Z" fill="#FCFCFC" />
                  <path d="M242 169V156H235V169H242Z" fill="#FCFCFC" />
                  <path d="M242 193V180H235V193H242Z" fill="#FCFCFC" />
                  <path d="M242 217V204H235V217H242Z" fill="#FCFCFC" />
                  <path d="M242 241V228H235V241H242Z" fill="#FCFCFC" />
                  <path
                    d="M14 98L268 0L286 45C286 45 262 55 273 79C273 79 285 96 303 90L320 135L293 145V98H14Z"
                    fill="#ACF600"
                  />
                  <path
                    d="M254 89L246 91L249.53 98H258.02L254 89Z"
                    fill="#F9F9F9"
                  />
                  <path
                    d="M233.032 34.3732L228.524 22.1798L221.958 24.6072L226.466 36.8006L233.032 34.3732Z"
                    fill="white"
                  />
                  <path
                    d="M241.031 56.3757L236.523 44.1824L229.958 46.6098L234.466 58.8031L241.031 56.3757Z"
                    fill="#F9F9F9"
                  />
                  <path
                    d="M250.027 78.3762L245.519 66.1829L238.954 68.6103L243.462 80.8036L250.027 78.3762Z"
                    fill="#F8F9F7"
                  />
                  <path
                    d="M17.5 244.5C3.77001 230.76 29.36 163.02 80.27 134.64C113.78 115.96 148.65 119.64 164.85 122.64C164.85 122.64 165.16 195.04 128.07 225.05C128.07 225.05 92.3 259.3 60.89 239.05C60.89 239.05 47.49 225.05 76.89 201.43C92.52 188.88 107.57 184.01 106.83 181.27C105.92 177.9 78.22 174.53 61.46 189.55C41.29 207.64 50.94 239.85 33.46 246.55C28.57 248.39 21.31 248.32 17.5 244.5Z"
                    fill="#F8F9F7"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_61_47">
                    <rect width="320" height="248" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span className="font-bold text-xl text-mint mt-2 dark:text-white">
                EventMint
              </span>
            </a>
          </Link>
          <div className="flex gap-2 border border-index rounded-full py-2 px-4 shadow-md shadow-grey-500 ">
            <div className="text-mint dark:text-white">AnyWhere</div>
            <div className="border-l border-mint dark:border-index"></div>
            <div className="text-mint dark:text-white">AnyWeek</div>
            <div className="border-l border-mint dark:border-index"></div>
            <div className="text-mint dark:text-white">Anytime</div>
            <button className="bg-index text-white p-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <Link
            to={user ? "/account" : "/login"}
            className="flex items-center gap-2 border border-index rounded-full py-2 px-4 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <div className="bg-gray-500 text-white rounded-full border border-grey-500 overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {!!user && <div>{user.name}</div>}
          </Link>
        </header>
      </main>
    </>
  );
};

export default Navbar;
