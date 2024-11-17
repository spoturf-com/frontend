import { useState, useEffect, useContext } from "react";
import makeRequest from "../axios";
import BookingCard from "../components/BookingCard";
import { AuthContext } from "../context/authContext";

export default function BookingDetails() {
  const [bookings, setBookings] = useState([]);
  const { userData } = useContext(AuthContext);
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await makeRequest.get(`/bookings/customer/${userData.CID}`);
        setBookings(response.data); // Store fetched data in bookings
        console.log("Bookings: ", response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    fetchBookings();
  }, [changes, userData.CID]);

  const handleChanges = () => {
    setChanges((prev) => !prev); // Toggle changes to trigger re-fetch
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="space-y-12">
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-950 dark:text-white border-b-2 border-gray-300 pb-2">
            Upcoming - Yet to confirm by the turf owners
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings
              .filter((booking) => booking.status === "Pending")
              .map((booking) => (
                <BookingCard
                  key={booking.BID}
                  BID={booking.BID}
                  members={booking.teamMembers}
                  paymentAmount={booking.paymentAmount}
                  sport={booking.game}
                  status={booking.status}
                  time={booking.slot}
                  date={booking.date}
                  turfName={booking.turfName}
                  setChanges={handleChanges} // Trigger state change
                />
              ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-600 border-b-2 border-green-300 pb-2">
            Confirmed
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings
              .filter((booking) => booking.status === "Confirmed")
              .map((booking) => (
                <BookingCard
                  key={booking.BID}
                  BID={booking.BID}
                  members={booking.teamMembers}
                  paymentAmount={booking.paymentAmount}
                  sport={booking.game}
                  status={booking.status}
                  time={booking.slot}
                  date={booking.date}
                  setChanges={handleChanges} // Trigger state change
                  turfName={booking.turfName}
                />
              ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-red-600 border-b-2 border-red-300 pb-2">
            Cancelled
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings
              .filter((booking) => booking.status === "Cancelled")
              .map((booking) => (
                <BookingCard
                  key={booking.BID}
                  BID={booking.BID}
                  members={booking.teamMembers}
                  paymentAmount={booking.paymentAmount}
                  sport={booking.game}
                  status={booking.status}
                  time={booking.slot}
                  date={booking.date}
                  setChanges={handleChanges} // Trigger state change
                  turfName={booking.turfName}

                />
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
