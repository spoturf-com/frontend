import moment from "moment";
import makeRequest from "../axios";

export default function BookingCard({
  setChanges,
  BID,
  time,
  turfName,
  sport,
  members,
  status,
  paymentAmount,
  date,
}) {
  const handleCancel = async () => {
    try {
        await makeRequest.put(`/bookings/status/${BID}`, { status: 'Cancelled' });
        setChanges(); // Trigger re-fetch by calling the state toggle function
      } catch (error) {
        console.error('Error accepting booking:', error);
      }
  };

  return (
    <div className="flex items-start justify-between rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-primary dark:text-gray-200">
          #{BID}
        </span>
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {moment(date).format("ll")}
        </span>
        <span className="text-xs py-4 text-gray-500 dark:text-gray-400">
          {Array.isArray(time) ? (
            time.map((i, index) => (
              <li key={index} className="list-none">
                {i}
              </li>
            ))
          ) : (
            <span>No available time slots</span>
          )}
        </span>
      </div>
      <div className="ml-4 flex-1 space-y-2">
        <h3 className="text-md font-semibold text-gray-900 dark:text-white">
          Turf Name: <span className="font-medium">{turfName}</span>
        </h3>
        <p className="text-md text-gray-500 dark:text-gray-400">
          Paid: <span className="font-medium">₹{paymentAmount}/-</span>
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400">
          Sport:{" "}
          <span className="font-medium">
            {Array.isArray(sport) ? sport.join(", ") : sport}
          </span>
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400">
          No. of Members: <span className="font-medium">{members}</span>
        </p>
        <div className="flex items-center gap-4 mt-4">
          {status === "Confirmed" && (
            <button
              type="button"
              className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              Confirmed
            </button>
          )}
          {status === "Cancelled" && (
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L17.94 6M18 18L6.06 6"
                />
              </svg>
              Cancelled
            </button>
          )}
          {status === "Pending" && (
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L17.94 6M18 18L6.06 6"
                />
              </svg>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
