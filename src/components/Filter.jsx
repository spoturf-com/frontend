import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTeamMembers,
  setRating,
  setPriceRange,
  resetFilters,
} from "../slice/filterSlice";

export default function Filter() {
  const dispatch = useDispatch();
  const { teamMembers, rating, priceRange } = useSelector(
    (state) => state.filter
  );

  const handleIncrement = () => {
    if (teamMembers < 15) dispatch(setTeamMembers(teamMembers + 1));
  };

  const handleDecrement = () => {
    if (teamMembers > 1) dispatch(setTeamMembers(teamMembers - 1));
  };

  const handleRatingChange = (newRating) => {
    dispatch(setRating(newRating));
  };

  const handlePriceChange = (e) => {
    dispatch(setPriceRange(Number(e.target.value)));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="col-span-12 md:col-span-2 w-full max-md:max-w-md max-md:mx-auto">
      <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-4 w-full md:max-w-sm">
        <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
          <p className="font-medium text-base leading-7 text-black ">
            Filter Plans
          </p>
          <button
            onClick={handleReset}
            className="font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-indigo-600"
          >
            RESET
          </button>
        </div>

        {/* Team Members Counter */}
        <div className="flex flex-row justify-between items-center mb-3">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Team Members
          </label>
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={handleDecrement}
              className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              {/* Decrement Icon */}
            </button>
            <input
              type="text"
              value={teamMembers}
              readOnly
              className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
            />
            <button
              type="button"
              onClick={handleIncrement}
              className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              {/* Increment Icon */}
            </button>
          </div>
        </div>

        {/* Rating Selection */}
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Ratings
          </label>
          <div className="rating rating-md">
            {[1, 2, 3, 4, 5].map((rate) => (
              <input
                key={rate}
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
                checked={rating === rate}
                onChange={() => handleRatingChange(rate)}
              />
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Price
          </label>
          <div className="relative mb-6">
            <input
              type="range"
              min={100}
              max={1000}
              step={100}
              value={priceRange}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
              ₹{priceRange}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
