import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  toggleGamePreference,
  toggleTimeSlot,
  setSelectedDate,
} from "../slice/filterSlice.js";

// Import images for games
import Cricket_Batsman from "../images/Cricket_Batsman.png";
import Shuttle_Player from "../images/shuttle.png";
import Football_Player from "../images/Football_Player.png";
import Basketball_Player from "../images/Basketball_Player.png";

const gameData = [
  { name: "Cricket", imgSrc: Cricket_Batsman, color: "bg-blue-500" },
  { name: "Shuttle", imgSrc: Shuttle_Player, color: "bg-red-500" },
  { name: "Football", imgSrc: Football_Player, color: "bg-green-700" },
  { name: "Basketball", imgSrc: Basketball_Player, color: "bg-orange-500" },
];

export default function Booking() {
  const dispatch = useDispatch();
  const { games, selectedTimeSlots, selectedDate } = useSelector(
    (state) => state.filter
  );

  const dateContainerRef = useRef(null);

  // Initialize dates array with the next 10 days
  const dates = Array.from({ length: 10 }, (_, index) => ({
    date: moment().add(index, "days").format("MMM Do"),
    selected: selectedDate === moment().add(index, "days").format("MMM Do"),
  }));

  const handleDateClick = (date) => {
    dispatch(setSelectedDate(date)); // Dispatch selected date to Redux
  };

  const handleTimeSlotClick = (timeSlot) => {
    dispatch(toggleTimeSlot(timeSlot));
  };

  const handlePreference = (game) => {
    dispatch(toggleGamePreference(game));
  };
  const availableTimeSlots = [];
  const start = moment("09:00:00", "HH:mm:ss");
  const tempstart = moment("09:00:00", "HH:mm:ss");
  const end = moment("23:00:00", "HH:mm:ss");
  while (start.isBefore(end)) {
    availableTimeSlots.push(
      `${start.format("hA").toLowerCase()} - ${tempstart
        .add(1, "hour")
        .format("hA")
        .toLowerCase()}`
    );
    start.add(1, "hour");
    tempstart.add(1, "hour");
  }
  const timeSlotRows = [];
  for (let i = 0; i < availableTimeSlots.length; i += 8) {
    timeSlotRows.push(availableTimeSlots.slice(i, i + 8));
  }

  // Scroll functionality for dates
  const scrollLeft = () => {
    if (dateContainerRef.current) {
      dateContainerRef.current.scrollLeft -= 150;
    }
  };

  const scrollRight = () => {
    if (dateContainerRef.current) {
      dateContainerRef.current.scrollLeft += 150;
    }
  };

  return (
    <div className="w-full bg-gray-50/10 flex flex-col p-4 md:p-6 rounded-lg shadow-lg space-y-6">
      {/* Game Preference Section */}
      <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
        Game Preference:
      </h3>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {gameData.map((game) => (
          <li
            key={game.name}
            className="flex flex-col items-center justify-center"
          >
            <input
              type="checkbox"
              id={game.name}
              className="hidden peer"
              checked={games.includes(game.name)}
              onChange={() => handlePreference(game.name)}
            />
            <label
              htmlFor={game.name}
              className={`flex flex-col items-center justify-center w-full px-2 py-2 text-xs rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
                games.includes(game.name)
                  ? `${game.color} text-white`
                  : "bg-white text-gray-800"
              }`}
            >
              <img
                src={game.imgSrc}
                alt={`${game.name} Player`}
                className="w-20 h-20 object-contain mb-2"
              />
              <span className="text-xs font-medium">{game.name}</span>
            </label>
          </li>
        ))}
      </ul>

      {/* Date Selection Section */}
      <h1 className="text-lg md:text-xl font-semibold text-gray-700">
        Select a Date
      </h1>
      <div className="flex items-center space-x-2 md:space-x-4">
        <button
          onClick={scrollLeft}
          className="p-2 bg-gray-300 text-gray-600 rounded-full hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400"
        >
          ◀
        </button>
        <div
          ref={dateContainerRef}
          className="flex overflow-x-auto space-x-2 scrollbar-hide"
        >
          {dates.map((dateObj, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(dateObj.date)}
              className={`min-w-[60px] p-2 rounded-lg text-center transition-colors duration-200 ${
                dateObj.selected
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-primary/50 focus:bg-primary/80 hover:text-white`}
            >
              <span className="text-sm md:text-base font-medium">
                {dateObj.date}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="p-2 bg-gray-300 text-gray-600 rounded-full hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400"
        >
          ▶
        </button>
      </div>

      {/* Time Slot Selection Section */}
      <h1 className="text-lg md:text-xl font-semibold text-gray-700">
        Select a Time Slot
      </h1>
      <div className="space-y-2">
        {timeSlotRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-wrap justify-between space-x-2 md:space-x-4"
          >
            {row.map((slot) => (
              <div
                key={slot}
                onClick={() => handleTimeSlotClick(slot)}
                className={`p-2 m-0.5 flex-1 text-center rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedTimeSlots.includes(slot)
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-primary/80 focus:bg-primary/50 hover:text-white`}
              >
                <span className="text-xs whitespace-nowrap sm:text-xs font-medium">{slot}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
