import React from "react";
import football from "../images/football.svg";
import FootballPlayer from "../images/Football_Player.svg";
import { Link } from "react-router-dom";
import ShuttleCourt from "../images/tennis-hall.jpg";
import CricketPitch from "../images/cricket-hall.jpg";
import FootballStad from "../images/football-hall.png";
import Choose from "../images/Choose.webp";
import DateSelect from "../images/Date.webp";
import Book from "../images/Book.webp";

export default function Carousel() {
  return (
    <div className="no-scrollbar">
      <div className="lg:max-h-screen no-scrollbar lg:max-w-screen flex flex-col lg:flex-row">
        {/* Background Image */}
        <div className="relative no-scrollbar lg:absolute -translate-x-0 translate-y-8 lg:-translate-x-56 lg:translate-y-16 w-full lg:w-4/12">
          <img
            src={football}
            alt="Football Background"
            className="size-full opacity-30 scale-150 object-cover w-full h-64 lg:h-auto"
          />
        </div>
        {/* Main Content */}
        <div className="flex items-center no-scrollbar -mt-56 lg:-mt-0 justify-center w-full lg:w-1/2 h-[36rem] px-4 lg:px-12">
          <div className="relative flex-col justify-center items-center text-center">
            <h2 className="lg:text-3xl text-2xl font-Mulish">
              Unleash Your Game
            </h2>
            <h1 className="lg:text-5xl text-4xl font-bold font-Mulish">
              Book the Best Turf in Town!
            </h1>
            <p className="lg:pt-5 text-xl font-extralight">
              &quot;Book your favorite sports venues effortlessly. Find,
              reserve, and play at your nearby turfs with just a few taps.&quot;
            </p>
            <div className="p-4 lg:p-6">
              <Link
                to={"preference"}
                className="bg-primary hover:bg-primary text-white text-sm py-2 px-4 rounded-3xl"
              >
                Let's Game On
              </Link>
            </div>
          </div>
        </div>
        {/* Player Image */}
        <div className="flex no-scrollbar justify-center items-center w-full lg:w-1/2">
          <div className="relative bg-gradient-to-b rounded-full from-[#41980A]/60 to-[#E3F4F1]/60">
            <div className="flex justify-center">
              <img
                src={FootballPlayer}
                alt="Football Player"
                className="size-full scale-125 w-40 h-40 lg:w-auto lg:h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Turf Highlights Section */}
      <div className="bg-gray-100 no-scrollbar p-6 lg:p-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Sports & Turfs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img
              src={FootballStad}
              alt="Turf 1"
              className="h-40 w-full object-cover mb-4 rounded-xl"
            />
            <h3 className="text-xl font-semibold">Football Turf</h3>
            <p className="text-center">
              Top-quality football turf available for booking. Play like a pro!
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={CricketPitch}
              alt="Turf 2"
              className="h-40 w-full object-cover mb-4 rounded-xl"
            />
            <h3 className="text-xl font-semibold">Box Cricket Pitch</h3>
            <p className="text-center">
              Fully equipped pitch for cricket enthusiasts. Chalzlenge your
              friends!
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={ShuttleCourt}
              alt="Turf 3"
              className="h-40 w-full object-cover mb-4 rounded-xl"
            />
            <h3 className="text-xl font-semibold">Tennis Court</h3>
            <p className="text-center">
              Professional tennis courts ready for your game. Book and play
              anytime!
            </p>
          </div>
        </div>
      </div>

      {/* Booking Process Section */}
      <div className="bg-white no-scrollbar p-6 lg:p-10">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-12">
            <img src={Choose} alt="Step 1" className="h-20 w-20 mb-4 rounded-md" />
            <h3 className="text-xl font-semibold">Choose Your Turf</h3>
            <p className="text-center">
              Browse through various turfs and select the one that suits your
              needs.
            </p>
          </div>
          <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-12">
            <img src={DateSelect} alt="Step 2" className="h-20 w-20 mb-4 rounded-md" />
            <h3 className="text-xl font-semibold">Select Date & Time</h3>
            <p className="text-center">
              Pick your desired date and available time slots for booking.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src={Book} alt="Step 3" className="h-20 w-20 mb-4 rounded-md" />
            <h3 className="text-xl font-semibold">Confirm & Play</h3>
            <p className="text-center">
              Complete your booking and get ready to enjoy your game at the best
              turf.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
