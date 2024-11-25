import React, { useState, useEffect } from "react";
import styles from "./HotelDetail.module.css";
import DemoNavbar from "components/Navbars/DemoNavbar";
import Footer from "./Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HotelDetail() {
    const [showGallery, setShowGallery] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [propertyData, setPropertyData] = useState(null); // State to store property details
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null);
    const [expandedRoom, setExpandedRoom] = useState(null);

    console.log(selectedPrice)

    const getFilteredAmenities = () => {
        const amenities = propertyData?.data?.amenities?.mandatory || {};
        return Object.keys(amenities)
            .filter((key) => amenities[key] === "Yes")
            .slice(0, 5); // Limit to 5 amenities
    };
    const roomNames = propertyData?.data?.rooms?.data?.map(
        (room) => room.roomName
    );

    // Simulated hotel data
    const hotel = {
        name: propertyData?.data?.basicInfo?.propertyName,
        images: propertyData?.data?.photosAndVideos?.images,
        title: propertyData?.data?.basicInfo?.propertyName,
        description:
            "Hotel Mount View, part of the UNO Hotels collection, offers a serene escape nestled in breathtaking surroundings. Known for its stunning mountain view, it offers luxurious accommodations, exceptional service, and a variety of amenities to ensure a relaxing stay. The hotel features an outdoor pool, spa, fitness center, and several on-site dining options. Guests can enjoy scenic views, explore nearby trails, and experience a peaceful retreat in nature. The friendly staff is always ready to assist with any needs, making every stay unforgettable.",
        contact: {
            phone: propertyData?.data?.basicInfo?.mobile,
            email: propertyData?.data?.basicInfo?.email,
            address: propertyData?.data?.location?.address,
        },
        amenities: getFilteredAmenities(),
        // roomCategories: renderRooms(),
        reviews: [
            {
                name: "John Doe",
                rating: 4,
                comment: "Beautiful hotel with amazing views! Highly recommended.",
            },
            {
                name: "Jane Smith",
                rating: 5,
                comment:
                    "Best stay ever! The rooms were fantastic and the staff was super friendly.",
            },
            {
                name: "Michael Brown",
                rating: 3,
                comment: "Good hotel, but the check-in process was a bit slow.",
            },
        ],
        policies: `Cancellation Policy: - If booking is cancelled between 24 hours to the check-in date of the booking,
         the guest will be charged 50% of the booking amount.
          - If booking is cancelled more than 24 hours before the check-in date, the guest will receive a full refund.
           - No-shows will be charged the full amount of the booking.`,
    };

    const [queryParams, setQueryParams] = useState({
        propertyId: "",
        city: "",
        checkInDate: "",
        checkOutDate: "",
        rooms: 0,
        adults: 0,
        children: 0,
    });

    console.log(queryParams);

    const formatDateToISO = (dateString) => {
        // Ensure dateString is valid
        if (!dateString) return null;

        const date = new Date(dateString);

        // Check for an invalid date
        if (isNaN(date.getTime())) {
            console.error(`Invalid date string: ${dateString}`);
            return null;
        }

        return date.toISOString().split("T")[0]; // Return ISO date format
    };

    useEffect(() => {
        // Get the current URL and extract query parameters
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        // Parse and store the query parameters
        setQueryParams({
            propertyId: params.get("propertyId") || "", // Extract booking ID from the path if needed
            city: params.get("city") || "",
            checkInDate: params.get("checkInDate") || "",
            checkOutDate: params.get("checkOutDate") || "",
            rooms: parseInt(params.get("rooms") || "0"),
            adults: parseInt(params.get("adults") || "0"),
            children: parseInt(params.get("children") || "0"),
        });
    }, []);

    useEffect(() => {
        // Fetch property details when propertyId is available
        const fetchPropertyDetails = async () => {
            if (!queryParams.propertyId) return;

            setIsLoading(true); // Start loading
            try {
                const response = await fetch(
                    `http://localhost:3000/api/property/get-property-by-id/${queryParams.propertyId}`
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setPropertyData(data); // Store the fetched data
            } catch (err) {
                setError(err.message); // Set error if API call fails
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchPropertyDetails();
    }, [queryParams.propertyId]);

    console.log(propertyData);

    // Toggle gallery visibility
    const toggleGallery = () => setShowGallery(!showGallery);

    // Handle the click of a small image to open the gallery at the clicked image
    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setShowGallery(true);
    };

    // Navigate to the next image in the gallery
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hotel.images.length);
    };
    // Navigate to the previous image in the gallery
    const prevImage = () => {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + hotel.images.length) % hotel.images.length
        );
    };

    // Toggle the calendar visibility
    const toggleCalendar = () => setShowCalendar(!showCalendar);

    // Calculate total price based on selected dates and rooms
    const handleAddRoom = (roomName, planType, price) => {
        if (!startDate || !endDate) {
            alert("Please select check-in and check-out dates first.");
            return;
        }

        const newRoom = { roomName, planType, price };
        setSelectedRooms([...selectedRooms, newRoom]);

        const daysDifference = calculateDaysDifference(startDate, endDate);
        const newTotalPrice = daysDifference * price;
        setTotalPrice((prevPrice) => prevPrice + newTotalPrice);
    };

    // Calculate days difference between the check-in and check-out dates
    const calculateDaysDifference = (startDate, endDate) => {
        if (!startDate || !endDate) return 0;
        const timeDifference = endDate.getTime() - startDate.getTime();
        return timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
    };

    // Handle room removal from selectedRooms
    const handleRemoveRoom = (index) => {
        const updatedRooms = selectedRooms.filter((_, i) => i !== index);
        setSelectedRooms(updatedRooms);

        const newTotalPrice = updatedRooms.reduce(
            (total, room) => total + room.price,
            0
        );
        setTotalPrice(newTotalPrice);
    };

    // Update total price when dates or rooms change
    useEffect(() => {
        if (startDate && endDate) {
            const daysDifference = calculateDaysDifference(startDate, endDate);
            let newTotalPrice = 0;
            selectedRooms.forEach((room) => {
                newTotalPrice += daysDifference * room.price;
            });
            setTotalPrice(newTotalPrice);
        }
    }, [startDate, endDate, selectedRooms]);

    // Truncate Description
    const truncateDescription = (description, wordLimit) => {
        const words = description.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return description;
    };

    const handleToggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleExpandRoom = (room) => {
        setExpandedRoom((prevRoom) => (prevRoom === room ? null : room));
    };

    const formattedCheckInDate = formatDateToISO(queryParams?.checkInDate);

    const handlePriceSelection = (price) => {
        setTotalPrice(price?.value)
    }


    const handleSelection = (room, plan, personCount, rate) => {
        const selectedKey = `${room}-${plan}-${personCount}`;
        const isSelected = selectedRooms.some((item) => item.key === selectedKey);
    
        if (isSelected) {
          // Remove from selection
          setSelectedRooms((prev) =>
            prev.filter((item) => item.key !== selectedKey)
          );
          setTotalPrice((prev) => prev - rate);
        } else {
          // Add to selection
          setSelectedRooms((prev) => [
            ...prev,
            { key: selectedKey, room, plan, personCount, rate },
          ]);
          setTotalPrice((prev) => prev + rate);
        }
      };

      const formatDateToYYYYMMDD = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    

    return (
        <>
            <DemoNavbar />
            <div className={`${styles.hotelDetail} max-w-[1400px] mx-auto`}>
                <div className="container-fluid">
                    <div className="row">
                        {/* Hotel Images Section */}
                        <section className="col-md-12 mt-[120px]">
                            <div className={styles.imageGrid}>
                                <div className={`${styles.imageBox} ${styles.largeImage}`}>
                                    <img
                                        src={hotel?.images?.[0]}
                                        alt="Hotel view 1"
                                        className={styles.hotelImage}
                                    />
                                </div>
                                <div className={styles.smallImageGrid}>
                                    {/* Display the first 5 images */}
                                    {hotel?.images?.slice(1, 5).map((image, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.imageBox} ${styles.smallImage}`}
                                            onClick={() => handleImageClick(index + 1)}
                                        >
                                            <img
                                                src={image}
                                                alt={`Hotel view ${index + 2}`}
                                                className={styles.hotelImage}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Only show this button if there are more than 5 images */}
                            {hotel?.images?.length > 5 && (
                                <button
                                    className={styles.openGalleryButton}
                                    onClick={toggleGallery}
                                >
                                    Open Gallery
                                </button>
                            )}
                        </section>
                    </div>
                </div>

                {/* Gallery Modal */}
                {showGallery && (
                    <div className={styles.galleryModal}>
                        <div className={styles.galleryModalContent}>
                            <button className={styles.closeButton} onClick={toggleGallery}>
                                X
                            </button>
                            <button className={styles.prevButton} onClick={prevImage}>
                                &lt;
                            </button>
                            <img
                                src={hotel.images[currentImageIndex]}
                                alt={`Hotel view ${currentImageIndex + 1}`}
                                className={styles.galleryImage}
                            />
                            <button className={styles.nextButton} onClick={nextImage}>
                                &gt;
                            </button>
                        </div>
                    </div>
                )}
                {/* Hotel Info Section */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <section className="bg-white p-4 rounded-5 shadow-lg mb-4 mt-4">
                                <h2 className="text-3xl font-bold mb-3">{hotel?.name}</h2>
                                <p>
                                    {showFullDescription
                                        ? hotel.description
                                        : truncateDescription(hotel.description, 30)}
                                </p>
                                <button
                                    onClick={handleToggleDescription}
                                    className="btn btn-secondary rounded-5 shadow-lg p-2"
                                    style={{
                                        float: "right",
                                    }}
                                >
                                    {showFullDescription ? "Read Less" : "Read More"}
                                </button>
                                <p>
                                    <span className="font-weight-bold">Phone:</span>{" "}
                                    {hotel.contact.phone}
                                </p>
                                <p>
                                    <span className="font-weight-bold">Email:</span>{" "}
                                    {hotel.contact.email}
                                </p>
                                <p>
                                    <span className="font-weight-bold">Address:</span>{" "}
                                    {hotel.contact.address}
                                </p>
                            </section>
                            {/* Combined Section for Amenities and Room Categories */}
                            <section className="bg-white p-4 rounded-5 shadow-lg mb-4">
                                {/* Amenities Section */}
                                <div className="mb-4 ">
                                    <h3 className="mb-3">Amenities</h3>
                                    <ul className="list-unstyled d-flex flex-wrap">
                                        {hotel.amenities && hotel.amenities.length > 0 ? (
                                            hotel.amenities.map((amenity, index) => (
                                                <li
                                                    key={index}
                                                    className="d-inline-block mx-2 my-1"
                                                    style={{
                                                        color: "black", // Black text color for the amenity name
                                                        marginRight: "12px", // Spacing between the dots
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: "#28a745", // Green color for the dot
                                                            marginRight: "8px", // Space between the dot and the text
                                                        }}
                                                    >
                                                        •
                                                    </span>
                                                    {amenity} {/* Display the amenity name */}
                                                </li>
                                            ))
                                        ) : (
                                            <p>No amenities available.</p> // Fallback if amenities are not available
                                        )}
                                    </ul>
                                </div>
                                {/* Room Categories and Pricing Section */}
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="m-0">Choose your room(s)</h4>
                                        <button
                                            className="btn btn-secondary rounded-5 shadow-md"
                                            style={{ borderRadius: "8px" }}
                                            onClick={toggleCalendar}
                                        >
                                            Check Availability
                                        </button>
                                    </div>

                                    {/* Date Picker */}
                                    {showCalendar && (
                                        <div className="calendar-container mb-3">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <label className="mb-2">Check-in Date</label>
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        placeholderText="Select check-in date"
                                                        className="form-control"
                                                        dateFormat="dd/MM/yyyy"
                                                        minDate={new Date()}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-2">Check-out Date</label>
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) => setEndDate(date)}
                                                        placeholderText="Select check-out date"
                                                        className="form-control"
                                                        dateFormat="dd/MM/yyyy"
                                                        minDate={startDate}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Room Categories & Pricing */}

                                    <div className="pt-4 pb-4">
    {roomNames?.map((room, idx) => {
        const roomData = propertyData?.data?.inventory?.website?.[room];
        const isExpanded = expandedRoom === room;

        return (
            <div
                key={idx}
                className={`w-full p-4 bg-white shadow-md border-gray-200 border-2 rounded-md mb-4 cursor-pointer hover:shadow-xl ${isExpanded ? "bg-blue-50" : ""}`}
                onClick={() => handleExpandRoom(room)} // This only toggles expansion
            >
                <div className="text-2xl font-bold mb-2">{room}</div>

                {isExpanded && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-md">
                        {roomData?.rates &&
                            Object.entries(roomData.rates).map(([plan, planData]) => {
                                const filteredRates = Object.entries(planData).flatMap(
                                    ([personCount, rates]) => {
                                        const ratesArray = Array.isArray(rates) ? rates : [];
                                        return ratesArray.filter(
                                            (rate) =>
                                                formatDateToISO(rate?.date) === formattedCheckInDate
                                        );
                                    }
                                );

                                return (
                                    <div key={plan} className="mb-0">
                                        {/* Plan Heading */}
                                        <div className="font-semibold text-lg text-blue-600 border-b pb-2 mb-3">
                                            {plan}
                                        </div>
                                        <div className="flex gap-4">
                                            {filteredRates.length > 0 ? (
                                                filteredRates.map((rate, rateIdx) => (
                                                    <div
                                                        key={rateIdx}
                                                        className={`flex w-full items-center justify-between p-4 bg-white border rounded-lg shadow-sm mb-3 cursor-pointer 
                                                            ${selectedPrice?.plan === plan &&
                                                            selectedPrice?.personCount ===
                                                            Object.keys(planData)[rateIdx] &&
                                                            selectedPrice?.value === rate?.value
                                                                ? "ring-2 ring-blue-500 border-blue-500 border-2"
                                                                : "border-gray-200"
                                                            } hover:shadow-md`}
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevent click from collapsing the room
                                                            setSelectedPrice({
                                                                plan,
                                                                personCount: Object.keys(planData)[rateIdx],
                                                                value: rate?.value,
                                                                date: formattedCheckInDate,
                                                            });
                                                        }}
                                                    >
                                                        {/* Left Section */}
                                                        <div className="flex flex-col">
                                                            <span className="text-sm text-gray-500">
                                                                For {Object.keys(planData)[rateIdx]} Person(s)
                                                            </span>
                                                            <span className="text-base text-gray-700 font-medium">
                                                                ₹{rate?.value || "N/A"}
                                                            </span>
                                                        </div>

                                                        {/* Right Section */}
                                                        <div className="flex items-center">
                                                            <span className="text-xs text-gray-400">
                                                                {formattedCheckInDate}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-gray-500 mt-2">
                                                    No rates available for {formattedCheckInDate}.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                )}
            </div>
        );
    })}
</div>

                                </div>
                            </section>

                            {/* Cancellation Policy */}
                            <section className="bg-white p-3 rounded-5 shadow-lg mb-2 mt-3">
                                <h2 className="mb-3">Cancellation Policy</h2>
                                <p>{hotel.policies}</p>
                            </section>
                            {/* Reviews Section */}
                            <section className="bg-white mt-4 p-4 rounded-5 shadow-lg mb-4 ">
                                <h3 className="mb-3">Reviews</h3>
                                {hotel.reviews.length > 0 ? (
                                    hotel.reviews.map((review, index) => (
                                        <div key={index} className="review">
                                            <h5>
                                                {review.name} - <span>{"★".repeat(review.rating)}</span>
                                            </h5>
                                            <p>{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews yet.</p>
                                )}
                            </section>
                        </div>
                        {/* Reservation and Price Section */}
                        <div className="col-md-4 mt-4">
                            <div className="bg-white p-4 rounded-3 shadow-lg sticky-section">
                                <div className="mb-4">
                                    <h3>Total Price</h3>
                                    <p>
                                        <strong>Rs. {selectedPrice?.value || '0'}</strong> Total
                                        (Including Taxes & Fees)
                                    </p>
                                </div>

                                <h4 className="mb-4">Make a Reservation</h4>
                                <form>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="checkinDate" className="form-label">
                                                Check-in Date
                                            </label>
                                            <input
    type="date"
    id="checkinDate"
    className="form-control shadow-sm"
    required
    value={formatDateToYYYYMMDD(queryParams?.checkInDate)} // Format date
    onChange={(e) => setStartDate(new Date(e.target.value))} // Update as a Date object
/>

                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="checkoutDate" className="form-label">
                                                Check-out Date
                                            </label>
                                            <input
                                                type="date"
                                                id="checkoutDate"
                                                value={formatDateToYYYYMMDD(queryParams?.checkOutDate)} // Format date
                                                className="form-control shadow-sm"
                                                required
                                                onChange={(e) => setEndDate(new Date(e.target.value))}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="checkinTime" className="form-label">
                                                Check-in Time
                                            </label>
                                            <input
                                                type="time"
                                                id="checkinTime"
                                                className="form-control shadow-sm"
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="checkoutTime" className="form-label">
                                                Check-out Time
                                            </label>
                                            <input
                                                type="time"
                                                id="checkoutTime"
                                                className="form-control shadow-sm"
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/* Desktop View: Show Selected Rooms in the Form */}
                                    <div className="selected-rooms mt-4 d-none d-md-block">
                                        <h5>Selected Rooms</h5>
                                        <ul className="list-group">
                                            {selectedRooms.map((room, index) => (
                                                <li
                                                    key={index}
                                                    className="list-group-item d-flex justify-content-between align-items-center"
                                                >
                                                    {room.roomName} - {room.planType} - Rs. {room.price}
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleRemoveRoom(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 py-2">
                                        Confirm Reservation
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Fixed Bottom Section for Mobile View */}
                        <div className="fixed-bottom-section">
                            <div className="container">
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* Show selected rooms at the bottom in mobile */}
                                    <div className="selected-rooms">
                                        <h5>Selected Rooms</h5>
                                        <ul className="list-group">
                                            {selectedRooms.map((room, index) => (
                                                <li
                                                    key={index}
                                                    className="list-group-item d-flex justify-content-between align-items-center"
                                                >
                                                    {room.roomName} - {room.planType} - Rs. {room.price}
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleRemoveRoom(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className="total-price ml-3">
                                        Total: Rs. {totalPrice.toLocaleString()}
                                    </p>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Confirm Reservation
                                </button>
                            </div>
                        </div>

                        {/* CSS for Mobile Bottom Fixed Section and Desktop View */}
                        <style jsx>{`
              /* Basic styling for reservation section */
              .sticky-section {
                position: sticky;
                top: 60px; /* Keeps the section 20px from the top of the screen */
                z-index: 10; /* Ensures that the form stays on top of other content */
                background-color: white;
                padding: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }

              /* Fixed footer section for mobile view */
              .fixed-bottom-section {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background-color: white;
                padding: 15px;
                box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1); /* Shadow for separation */
                z-index: 1000;
                display: none; /* Initially hidden */
                overflow-y: auto; /* Allow scrolling if needed */
                max-height: 70vh; /* Limit the height if too many rooms are selected */
              }

              .fixed-bottom-section .container {
                max-width: 100%;
              }

              .fixed-bottom-section h5 {
                margin: 0;
              }

              .fixed-bottom-section .total-price {
                font-weight: bold;
              }

              /* Show the fixed-bottom-section only on mobile screens */
              @media (max-width: 767px) {
                .fixed-bottom-section {
                  display: block;
                }
                .selected-rooms {
                  margin-bottom: 10px; /* Add space between selected rooms and the total price */
                }
              }

              /* Desktop View: Hide the selected rooms in the form for small screens */
              @media (min-width: 768px) {
                .selected-rooms.d-none {
                  display: block;
                }
              }
            `}</style>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
