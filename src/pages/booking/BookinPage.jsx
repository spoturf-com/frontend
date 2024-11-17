import React, { useContext, useEffect, useState } from "react";
import TeamMembers from "../../components/modals/TeamMembers";
import Cricket_Batsman from "../../images/Cricket_Batsman.png";
import Shuttle_Player from "../../images/shuttle.png";
import Football_Player from "../../images/Football_Player.png";
import Basketball_Player from "../../images/Basketball_Player.png";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { clearBookings } from "../../slice/bookingSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import makeRequest from "../../axios";
import { AuthContext } from "../../context/authContext";

export default function BookinPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [tid, setTid] = useState([]);
  const [selectedMember, setSelectedMember] = useState(0);
  const gameData = [
    { name: "Cricket", imgSrc: Cricket_Batsman, color: "bg-blue-500" },
    { name: "Shuttle", imgSrc: Shuttle_Player, color: "bg-red-500" },
    { name: "Football", imgSrc: Football_Player, color: "bg-green-700" },
    { name: "Basketball", imgSrc: Basketball_Player, color: "bg-orange-500" },
  ];

  const handleCancelPayment = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/book/${bookingDetails.BID}`
      );
      dispatch(clearBookings());
      navigate(`/listing/${tid.TID}`);
    } catch (error) {
      console.log("Booking cancel error");
    }
  };
  const handlePayment = async (e) => {
    console.log(selectedMember);
    await makeRequest.put(`/payment/team/${bookingDetails.BID}`, {
      teamMembers: selectedMember,
    });
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8800/payment`, {
        amount: total,
        currency: "INR",
        receipt: `receipt_${bookingDetails.BID}`,
      });
      const order = response.data;
      const options = {
        key: "rzp_test_YLAYmvSlK4aA9E",
        amount: total * 100,
        currency: "INR",
        name: "Spoturf",
        description: "Booking Payment",
        order_id: order.id,
        prefill: {
          name: userData.name,
          email: "drummerviswa@gmail.com",
          contact: userData.mobileNo,
        },
        theme: {
          color: "#588157",
        },
        handler: async function (response) {
          try {
            await makeRequest.put(`/payment/booking/${bookingDetails.BID}`, {
              payment: "Paid",
            });
            navigate("/success", {
              state: {
                response: response.razorpay_order_id,
                booking: {
                  BID: bookingDetails.BID,
                  date: bookingDetails.date,
                  turfName: bookingDetails.turfName,
                  game: selectedGames,
                  slot: bookingDetails.slots,
                },
                options: options.id,
                user: { name: userData.name, mobileNo: userData.mobileNo },
              },
            });
          } catch (error) {
            console.error("Error updating payment status:", error);
            await makeRequest.put(`/payment/booking/${bookingDetails.BID}`, {
              payment: "Pending",
            });
            navigate("/success", {
              state: {
                response: response,
                booking: bookingDetails,
                options: options,
              },
            });
          }
        },
        modal: {
          ondismiss: function () {
            alert("Payment canceled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("Payment error:", error);
    }
  };
  const { bookingDetails } = useSelector((state) => state.booking);
  useEffect(() => {
    setTid(bookingDetails);
  }, []);

  const selectedGames = gameData.filter((g) => {
    return bookingDetails?.gamePreference?.includes(g.name);
  });
  const tax = bookingDetails.paymentAmount * 0.05;
  const convenience = 100;
  const courtPrice = bookingDetails.paymentAmount - convenience - tax;
  const total = tax + convenience + courtPrice;
  return (
    <>
      {bookingDetails && (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <TeamMembers
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <div className="flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col rounded-xl justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <h1>#{bookingDetails.BID}</h1>
                <p className="text-xl md:text-3xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                  {bookingDetails.turfName}
                </p>
                <div className="md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                  <div className="mt-4  flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h2 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
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
                            {bookingDetails.area}
                          </p>
                        </li>
                      </h2>
                      <div className="flex lg:grid lg:grid-cols-12 gap-x-12 lg:gap-x-20 mx-auto">
                        <div className="col-span-6 flex justify-center items-start flex-col">
                          <div className="flex justify-between items-center mb-3 gap-3">
                            <label
                              for="counter-input"
                              className="block text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Team Members:
                            </label>
                            <h3 className="flex gap-1">
                              {selectedMember}
                              <button onClick={() => setIsModalOpen(true)}>
                                <img
                                  width={15}
                                  height={15}
                                  data-modal-target="default-modal"
                                  data-modal-toggle="default-modal"
                                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgY2xhc3M9ImZlYXRoZXIgZmVhdGhlci1lZGl0IiBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMSA0SDRhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJ2LTciLz48cGF0aCBkPSJNMTguNSAyLjVhMi4xMjEgMi4xMjEgMCAwIDEgMyAzTDEyIDE1bC00IDEgMS00IDkuNS05LjV6Ii8+PC9zdmc+"
                                  alt=""
                                />
                              </button>
                            </h3>
                          </div>
                          <p className="text-md font-medium dark:text-white leading-none text-gray-800">
                            Game Preference
                          </p>
                          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                            {selectedGames?.map((game) => (
                              <li
                                key={game.name}
                                className="flex flex-col items-center justify-center"
                              >
                                <label
                                  htmlFor={game.name}
                                  className={`flex flex-col items-center justify-center w-full px-2 py-2 text-xs rounded-lg cursor-pointer transition-transform transform hover:scale-105`}
                                >
                                  <img
                                    src={game.imgSrc}
                                    alt={`${game.name} Player`}
                                    className="w-20 h-20 object-contain mb-2"
                                  />
                                  <span className="text-xs font-medium">
                                    {game.name}
                                  </span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-6">
                          <p className="lg:text-md whitespace-nowrap text-sm font-medium dark:text-white leading-none text-gray-800">
                            Date
                            <span className="font-normal">
                              {": " + moment(bookingDetails.date).format("LL")}
                            </span>
                          </p>
                          <p className="my-2 text-md font-medium dark:text-white leading-none text-gray-800">
                            Time Slots
                            <div className="space-y-2 mt-2">
                              <div className="flex flex-wrap justify-between space-x-2 md:space-x-4">
                                {bookingDetails?.slots?.map((slot) => (
                                  <div
                                    key={slot}
                                    className={`p-2 m-1 flex-1 text-center rounded-lg cursor-pointer transition-colors duration-200 bg-primary/80 focusbg-primary/50 text-white`}
                                  >
                                    <span className="text-xs whitespace-nowrap lg:text-sm font-medium">
                                      {slot}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-3 flex flex-col-reverse lg:grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3>Terms & Conditions</h3>
                <p>
                  Welcome to Material Tailwind (the 'Product'), a components
                  library that uses Tailwind CSS and React to help developers
                  build unique web projects faster and easier. By accessing or
                  using Material Tailwind(www.material-tailwind.com), you agree
                  to be bound by these terms and conditions. If you do not agree
                  with these terms and conditions, you must not use our
                  products.
                </p>
              </div>
            </div>
            <div className=" grow col-span-6">
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Court Price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ₹{courtPrice}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Convenience Fee
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ₹{convenience}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ₹{tax}
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ₹{total}
                  </dd>
                </dl>
                <div className="space-y-3 flex justify-center items-center space-x-4">
                  <button
                    type="button"
                    className="flex w-1/2 lg:w-1/3 items-center justify-center rounded-lg bg-gray-300 px-5 py-2.5 whitespace-nowrap text-xs lg:text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    onClick={handleCancelPayment}
                  >
                    Cancel Payment
                  </button>
                  <button
                    type="submit"
                    onClick={handlePayment}
                    className="flex w-1/2 lg:w-1/3 items-center justify-center rounded-lg bg-primary px-5 py-2.5 whitespace-nowrap text-xs lg:text-sm font-medium text-white hover:bg-primary/95 focus:outline-none focus:ring-4 focus:ring-primary/30 dark:bg-primary/60 dark:hover:bg-primary/70 dark:focus:ring-primary/80"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
