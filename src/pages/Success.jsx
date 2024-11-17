import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import moment from "moment";

export default function Success() {
  const location = useLocation();
  const { response, booking, options, user } = location.state;
  console.log("Result:", response, booking, options);

  return (
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div class="mx-auto max-w-2xl px-4 2xl:px-0">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
          Thanks for your order!
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
          Your order{" "}
          <a
            href="#"
            class="font-medium text-gray-900 dark:text-white hover:underline"
          >
            #{booking.BID}
          </a>{" "}
          will be processed within 24 hours during working days. We will notify
          you by email once your order has been shipped.
        </p>
        <div class="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
          <dl class="sm:flex items-center justify-between gap-4">
            <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Date
            </dt>
            <dd class="font-medium text-gray-900 dark:text-white sm:text-end">
              {moment(booking.date).format("LL")}
            </dd>
          </dl>
          <dl class="sm:flex items-center justify-between gap-4">
            <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Slots
            </dt>
            <dd class="font-medium text-gray-900 dark:text-white sm:text-end">
              {booking.slot.map((i) => {
                return <li>{i}</li>;
              })}
            </dd>
          </dl>
          <dl class="sm:flex items-center justify-between gap-4">
            <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Turf Name
            </dt>
            <dd class="font-medium text-gray-900 dark:text-white sm:text-end">
              {booking.turfName}
            </dd>
          </dl>
          <dl class="sm:flex items-center justify-between gap-4">
            <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Name
            </dt>
            <dd class="font-medium text-gray-900 dark:text-white sm:text-end">
              {user.name}
            </dd>
          </dl>
          <dl class="sm:flex items-center justify-between gap-4">
            <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Mobile
            </dt>
            <dd class="font-medium text-gray-900 dark:text-white sm:text-end">
              {user.mobileNo}
            </dd>
          </dl>
        </div>
        <div class="flex justify-center items-center space-x-4">
          <Link
            to={"/booking-history"}
            class="py-2.5 px-5 bg-primary text-white text-sm font-medium focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            See your Booking Status
          </Link>
        </div>
      </div>
    </section>
  );
}
