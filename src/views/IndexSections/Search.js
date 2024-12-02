import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import config from "config";

const EnhancedSearch = () => {
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [city, setCity] = useState("");
  const [hotel, setHotel] = useState("");
  const [hotelId, setHotelId] = useState(""); // Store the selected hotel ID
  const [hotels, setHotels] = useState([]); // Store the fetched hotels
  const navigate = useNavigate();

  console.log(hotelId)

  const dropdownOptions = ["Dharamshala", "Shimla", "Manali", "Dalhousie", "Amritsar"];

  // Fetch hotels based on selected city
  useEffect(() => {
    if (city) {
      fetch(`${config.API_HOST}/api/property/get-hotels-by-city/${city}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success && Array.isArray(data.data)) {
            // Save hotel names and IDs
            setHotels(data.data.map((hotel) => ({
              name: hotel.basicInfo.propertyName,
              id: hotel._id // Ensure your API provides a unique `id` for each hotel
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
    const url = `/booking?propertyId=${hotelId}&city=${city}&checkInDate=${startDate}&checkOutDate=${endDate}&rooms=${rooms}&adults=${adults}&children=${children}`;
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
          
          {renderDropdown(dropdownOptions, city, setCity, "Select City")}
        </div>

        {/* Hotel Dropdown */}
        <div className="w-full">
         
          {renderDropdown(
            hotels,
            hotel,
            setHotel,
            "Select Hotel",
            (option) => setHotelId(option.id) // Update hotelId on selection
          )}
        </div>

      
        {/* Check-Out Date */}
        <div className="w-full">
          
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            placeholderText="Select dates"
            className="w-full px-4 py-3 bg-transparent border shadow-md border-gray-200 border-1 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-lg"
          />
        </div>



<div className="w-full relative">
 
  <button
    type="button"
    onClick={() => setIsGuestsOpen(!isGuestsOpen)}
    className="w-full flex justify-between items-center px-4 py-3 bg-white text-sm rounded-xl shadow-md border-gray-200 border focus:outline-none hover:bg-gray-200 transition"
  >
    <span>{`${rooms} Room${rooms > 1 ? 's' : ''} · ${adults} Adult${adults > 1 ? 's' : ''} · ${children} Child${children > 1 ? 'ren' : ''}`}</span>
    <ChevronDownIcon className="w-5 h-5 text-gray-600" />
  </button>

  {isGuestsOpen && (
    <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
      {/* Rooms selector */}
      <div className="flex items-center justify-between py-2">
        <span className="text-gray-700">Rooms</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setRooms(Math.max(1, rooms - 1))}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-8 text-center">{rooms}</span>
          <button
            type="button"
            onClick={() => setRooms(Math.min(10, rooms + 1))}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Adults selector */}
      <div className="flex items-center justify-between py-2">
        <span className="text-gray-700">Adults</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAdults(Math.max(1, adults - 1))}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-8 text-center">{adults}</span>
          <button
            type="button"
            onClick={() => setAdults(Math.min(10, adults + 1))}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Children selector */}
      <div className="flex items-center justify-between py-2">
        <span className="text-gray-700">Children</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setChildren(Math.max(0, children - 1))}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-8 text-center">{children}</span>
          <button
            type="button"
            onClick={() => setChildren(Math.min(10, children + 1))}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )}
</div>

        {/* Submit Button */}
        <div className="absolute left-0 -bottom-[30px] flex justify-center items-center w-full">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-gray-900 border-[4px] text-white px-6 py-3 rounded-xl font-semibold shadow-md border-gray-200 border-1 hover:bg-gray-950 transition"
          >
            Book now
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedSearch;
