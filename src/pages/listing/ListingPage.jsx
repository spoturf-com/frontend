import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar";
import LocationComponent from "../../components/LocationComponent";
import Filter from "../../components/Filter";
import Turfcard from "../../components/Turfcard";
import Booking from "../../components/Booking";
import makeRequest from "../../axios";

function ListingPage() {
  const [turfs, setTurfs] = useState([]);
  const [filteredTurfs, setFilteredTurfs] = useState([]); // State for filtered turfs
  const [loading, setLoading] = useState(true);

  // Fetch filters from Redux store
  const { rating, priceRange, games } = useSelector((state) => state.filter);

  // Fetch turfs data from API using makeRequest
  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await makeRequest.get("/turfs");
        setTurfs(response.data);
        setFilteredTurfs(response.data); // Initialize filteredTurfs with the full data
        console.log("Turfs:", response.data);
      } catch (error) {
        console.error("Error fetching turfs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTurfs();
  }, []);

  // Filter turfs based on selected criteria
  useEffect(() => {
    const filterTurfs = () => {
      const result = turfs.filter((turf) => {
        const matchesPrice = priceRange === 100 || turf.price <= priceRange;
        const matchesRating = rating === 1 || turf.rating >= rating;
        const matchesGames =
          games.length === 0 ||
          games.some((game) => turf.gamesAvailable.includes(game));

        return matchesPrice && matchesRating && matchesGames;
      });
      setFilteredTurfs(result);
    };
    filterTurfs();
  }, [turfs, rating, priceRange, games]); // Re-run filter whenever filters change

  // Handle search input
  const handleSearch = (query) => {
    const searchResult = turfs.filter((turf) =>
      turf.turfName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTurfs(searchResult);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className="relative">
        <div className="w-full max-w-8xl mx-auto px-4">
          <div className="flex gap-8 items-center flex-row py-4">
            <LocationComponent />
          </div>
          <Booking />
          <div className="grid grid-cols-12">
            <Filter />
            <div className="p-6 col-span-12 md:col-span-10">
              <SearchBar onSearch={handleSearch} />
              <section className="flex justify-center items-center bg-gray-100/10 rounded-xl w-full py-8 antialiased dark:bg-gray-900 md:py-12">
                <div className="mx-auto max-w-screen-xl 2xl:px-0">
                  <div className="mb-4 px-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredTurfs.map((turf) => (
                      <Turfcard
                        rating={turf.rating}
                        key={turf.TID}
                        img={turf.images[0]}
                        title={turf.turfName}
                        location={turf.area}
                        price={turf.price}
                        tid={turf.TID}
                      />
                    ))}
                  </div>
                  <div className="w-full text-center">
                    <button className="rounded-lg border px-5 py-2.5 text-sm font-medium">
                      Show more
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ListingPage;
