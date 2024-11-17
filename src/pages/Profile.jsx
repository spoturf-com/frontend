import { useState, useEffect, useContext } from "react";
import makeRequest from "../axios";
import { AuthContext } from "../context/authContext";
import DefaultProfile from "../images/def_prof.png";

const Profile = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [customers, setCustomers] = useState({
    CID: userData.CID,
    name: "",
    area: "",
    address: "",
    email: "",
    profilePic: "",
  });

  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setCustomers(userData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [userData]); // Only trigger when userData changes

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await makeRequest.post("/upload", formData);
        const imageUrl = response.data.imageUrl;

        // Update profilePic state immediately
        setCustomers((prev) => ({
          ...prev,
          profilePic: imageUrl,
        }));
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomers((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeRequest.put(
        `/customers/${userData.CID}`,
        customers
      );
      setUserData(customers); // Update the global user data
      localStorage.setItem("userData", JSON.stringify(customers)); // Update local storage
      alert("Profile updated successfully");
      setLoading(true);
      console.log(response.data);
    } catch (error) {
      console.error("Update failed: ", error);
      alert("Profile update failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col p-6 md:flex-row gap-8">
      {/* Profile Section */}
      <div className="md:w-1/3">
        <div className="relative">
          <img
            src={customers.profilePic || DefaultProfile}
            alt="Profile Pic"
            className="h-48 w-48 rounded-full object-cover mx-auto"
          />
          <div className="absolute bottom-4 right-4">
            <label
              htmlFor="profilePic"
              className="cursor-pointer bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90"
            >
              <input
                type="file"
                id="profilePic"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              Edit
            </label>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="md:w-2/3">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={customers.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="mobileNo"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile No
              </label>
              <input
                type="text"
                id="mobileNo"
                name="mobileNo"
                value={customers.mobileNo}
                onChange={handleChange}
                maxLength={10}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="area"
                className="block text-sm font-medium text-gray-700"
              >
                Area
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={customers.area}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={customers.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={customers.address}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
