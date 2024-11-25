import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const EnhancedSearch = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [city, setCity] = useState("");
  const [hotel, setHotel] = useState("");
  const [hotelId, setHotelId] = useState(""); // Store the selected hotel ID
  const [hotels, setHotels] = useState([]); // Store the fetched hotels
  const navigate = useNavigate();

  console.log(hotelId)

  const dropdownOptions = ["Dharamshala", "Shimla", "Manali", "Kashmir", "Goa"];

  // Fetch hotels based on selected city
  useEffect(() => {
    if (city) {
      fetch(`http://localhost:3000/api/property/get-hotels-by-city/${city}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success && Array.isArray(data.data)) {
            // Save hotel names and IDs
            setHotels(data.data.map((hotel) => ({
              name: hotel.basicInfo.propertyName,
              id: hotel._id, // Ensure your API provides a unique `id` for each hotel
            })));
          } else {
            setHotels([]); // If no hotels found
          }
        })
        .catch((error) => {
          console.error("Error fetching hotels:", error);
          setHotels([]); // In case of error
        });
    }
  }, [city]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct the URL with query parameters
    const url = `/booking/${hotelId}?city=${city}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&rooms=${rooms}&adults=${adults}&children=${children}`;
    navigate(url);
  };

  // Dropdown rendering function
  const renderDropdown = (options, selected, setSelected, placeholder, onSelect = null) => (
    <Menu as="div" className="relative inline-block text-left z-[99] w-full">
      <Menu.Button className="w-full flex justify-between items-center px-4 py-3 bg-white text-sm rounded-xl shadow-md border-gray-200 border focus:outline-none hover:bg-gray-200 transition">
        {selected || placeholder}
        <ChevronDownIcon className="w-5 h-5 text-gray-600" />
      </Menu.Button>
      <Menu.Items className="absolute mt-2 w-full max-h-60 overflow-y-auto rounded-lg bg-white shadow-md z-50 border border-gray-200">
        {options.map((option, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-gray-100" : ""
                } w-full text-left px-4 py-2 text-sm text-gray-800`}
                onClick={() => {
                  setSelected(option.name || option); // Handle normal dropdowns or objects
                  if (onSelect) onSelect(option);
                }}
              >
                {option.name || option}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );

  return (
    <div className="py-10 px-6 w-[86%] border-b-[8px] b-2 border-gray-900 mx-auto bg-[rgba(255,255,255,0.9)] backdrop-blur-lg rounded-2xl shadow-md border-1">
      <form className="flex gap-5 justify-between items-center">
        {/* City Dropdown */}
        <div className="w-full">
          <label className="block text-sm text-center font-semibold text-gray-700 mb-2">
            City
          </label>
          {renderDropdown(dropdownOptions, city, setCity, "Select City")}
        </div>

        {/* Hotel Dropdown */}
        <div className="w-full">
          <label className="block text-sm text-center font-semibold text-gray-700 mb-2">
            Hotel
          </label>
          {renderDropdown(
            hotels,
            hotel,
            setHotel,
            "Select Hotel",
            (option) => setHotelId(option.id) // Update hotelId on selection
          )}
        </div>

        {/* Check-In Date */}
        <div className="w-full">
          <label className="block text-sm text-center font-semibold text-gray-700 mb-2">
            Check-In
          </label>
          <DatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            placeholderText="Select Date"
            className="w-full px-4 py-3 bg-transparent border shadow-md border-gray-200 border-1 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-lg"
          />
        </div>

        {/* Check-Out Date */}
        <div className="w-full">
          <label className="block text-sm text-center font-semibold text-gray-700 mb-2">
            Check-Out
          </label>
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            placeholderText="Select Date"
            className="w-full px-4 shadow-md border-gray-200 border-1 py-3 bg-transparent border focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-lg"
          />
        </div>

        {/* Rooms */}
        <div className="w-full">
          <label className="block text-sm text-center font-semibold text-gray-700 mb-2">
            Rooms
          </label>
          <input
            type="number"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            min="1"
            max="10"
            className="w-full px-4 py-3 bg-transparent border shadow-md border-gray-200 border-1 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-lg"
          />
        </div>

        {/* Guests */}
        <div className="w-full">
          <label className="block text-sm text-center font-semibold text-gray-700 mb-2">
            Guests (Adults & Children)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              min="1"
              max="10"
              placeholder="Adults"
              className="w-1/2 px-4 py-3 bg-transparent border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-lg"
            />
            <input
              type="number"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              min="0"
              max="10"
              placeholder="Children"
              className="w-1/2 px-4 py-3 bg-transparent border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-lg"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="absolute left-0 -bottom-[30px] flex justify-center items-center w-full">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-gray-900 border-[4px] border-gray-50 text-white px-6 py-3 rounded-xl font-semibold shadow-md border-gray-200 border-1 hover:bg-gray-950 transition"
          >
            Book now
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedSearch;
