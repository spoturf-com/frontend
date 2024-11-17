import React, { useContext } from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./pages/home/Home";
import Preference from "./pages/Preference";
import Carousel from "./components/Carousel";
import ListingPage from "./pages/listing/ListingPage";
import TurfDetails from "./pages/listing/TurfDetails";
import BookinPage from "./pages/booking/BookinPage";
import About from "./pages/home/About";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { AuthContext, AuthProvider } from "./context/authContext";
import store from "./store";
import Success from "./pages/Success";
import PageTitle from "./components/PageTitle";
import Profile from "./pages/Profile";
import BookingHistory from "./pages/BookingHistory";
import "react-toastify/dist/ReactToastify.css";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: window.location.pathname }} />
  );
};

export default ProtectedRoute;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <>
            <PageTitle title="Dashboard | Spoturf" />
            <Home />
          </>
        ),
        children: [
          {
            path: "/",
            element: (
              <>
                <PageTitle title="Spoturf | Home" />
                <Carousel />
              </>
            ),
          },
          {
            path: "about",
            element: (
              <>
                <PageTitle title="Spoturf | About Us" />
                <About />
              </>
            ),
          },
          {
            path: "listing",
            element: (
              <>
                <PageTitle title="Spoturf | Turf Listing" />
                <ListingPage />
              </>
            ),
          },
          {
            path: "listing/:id",
            element: (
              <>
                <PageTitle title="Spoturf | Turf Details " />
                <TurfDetails />
              </>
            ),
          },
          {
            path: "booking-history",
            element: (
              <>
                <PageTitle title="History | Turf Details " />
                <ProtectedRoute>
                  <BookingHistory />
                </ProtectedRoute>
              </>
            ),
          },
          {
            path: "/booking/:id",
            element: (
              <>
                <PageTitle title="Spoturf | Booking " />
                <ProtectedRoute>
                  <BookinPage />
                </ProtectedRoute>
              </>
            ),
          },
          {
            path: "/success",
            element: (
              <>
                <PageTitle title="Spoturf | Booking Success " />
                <Success />
              </>
            ),
          },

          {
            path: "/profile",
            element: (
              <>
                <PageTitle title="Spoturf | Booking " />
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "preference",
    element: (
      <>
        <PageTitle title="Spoturf | Preference" />
        <Preference />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <PageTitle title="Spoturf | Login " />
        <LoginPage />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <PageTitle title="Spoturf | Register |" />
        <RegisterPage />
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <PageTitle title="Spoturf - 404" />
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary dark:text-primary">
                404
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Something's missing.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry, we can't find that page. You'll find lots to explore on
                the home page.
              </p>
              <Link
                to={"/"}
                replace={true}
                className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </section>
      </>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </AuthProvider>
);
