import React from "react";
import { Link } from "react-router-dom";

export default function Turfcard({ tid, img, title, price, location, rating }) {
  return (
    <Link
      to={`/listing/${tid}`}
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="h-36 w-full">
        <button>
          <img
            className="mx-auto rounded-md w-full h-full dark:hidden"
            src={img}
            alt=""
          />
        </button>
      </div>
      <div className="pt-4 bg-opacity-35 bg-gray-50">
        <div className="flex flex-row justify-between items-center">
          <button className="text-lg font-semibold leading-tight text-start text-gray-900 dark:text-white">
            {title}
          </button>
          <p className=" leading-tight text-gray-900 dark:text-white flex flex-row">
            ₹{price}/
            <svg
              width={18}
              height={18}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>
          </p>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            ⭐ {rating}
          </p>
        </div>

        <ul className="mt-2 flex justify-between items-center gap-4">
          <li className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={15}
              height={15}
              viewBox="0 0 12 12"
            >
              <path
                fill="#588157"
                d="M6 .5A4.5 4.5 0 0 1 10.5 5c0 1.863-1.42 3.815-4.2 5.9a.5.5 0 0 1-.6 0C2.92 8.815 1.5 6.863 1.5 5A4.5 4.5 0 0 1 6 .5m0 1A3.5 3.5 0 0 0 2.5 5c0 1.355 1.059 2.918 3.224 4.653L6 9.871l.276-.218C8.441 7.918 9.5 6.355 9.5 5A3.5 3.5 0 0 0 6 1.5M6 4a1 1 0 1 1 0 2a1 1 0 0 1 0-2"
              ></path>
            </svg>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {location}
            </p>
          </li>
          <div className="flex items-center justify-end gap-4">
            <Link
              to={`/listing/${tid}`}
              className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-ternary focus:outline-none focus:ring-4  focus:ring-primary dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
            >
              Book
            </Link>
          </div>
        </ul>
      </div>
    </Link>
  );
}
