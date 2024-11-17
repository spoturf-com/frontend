import React, { useEffect, useState } from "react";

function LocationComponent() {
  const [userLocation, setUserLocation] = useState(null);
  const [area, setArea] = useState("Loading...");

  const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiZHJ1bW1lcnZpc3dhIiwiYSI6ImNtMnQyZTNkbDAzc2YyaXM3djV0M2ZtamkifQ.bBc9UbpsjuQSLEA13Gqzmw"; // Replace with your Mapbox access token

  // Function to get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
          setArea("Location access denied");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setArea("Geolocation not supported");
    }
  };

  // Fetch user location on component mount
  useEffect(() => {
    getUserLocation();
  }, []);

  // Fetch area name whenever location updates
  useEffect(() => {
    const getAreaName = async () => {
      if (userLocation) {
        const { latitude, longitude } = userLocation;
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
          );
          const data = await response.json();

          if (data && data.features && data.features.length > 0) {
            setArea(data.features[0].place_name);
            console.log(data);
          } else {
            setArea("Area not found");
          }
        } catch (error) {
          console.error("Error fetching area name:", error);
          setArea("Failed to fetch area name");
        }
      }
    };

    getAreaName();
  }, [userLocation]);

  return (
    <div>
      <h3 className="flex flex-row lg:text-lg text-xs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          height={30}
          viewBox="0 0 8 8"
        >
          <path
            fill="#588157"
            d="M4 0C2.34 0 1 1.34 1 3c0 2 3 5 3 5s3-3 3-5c0-1.66-1.34-3-3-3m0 1a2 2 0 0 1 2 2c0 1.11-.89 2-2 2a2 2 0 1 1 0-4"
          ></path>
        </svg>
        {area}
      </h3>
    </div>
  );
}

export default LocationComponent;
