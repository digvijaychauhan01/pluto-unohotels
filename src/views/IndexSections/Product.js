import React, { useState, useEffect } from "react";
import styles from "./HotelDetail.module.css";
import DemoNavbar from "components/Navbars/DemoNavbar";
import Footer from "./Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ImageGallerySkeleton = () => (
    <div className="animate-pulse">
        <div className="grid gap-4 grid-cols-4 h-[400px]">
            {/* Large Image Skeleton */}
            <div className="col-span-2 row-span-2 bg-gray-200 rounded-lg"></div>
            {/* Small Images Skeleton */}
            <div className="bg-gray-200 rounded-lg"></div>
            <div className="bg-gray-200 rounded-lg"></div>
            <div className="bg-gray-200 rounded-lg"></div>
            <div className="bg-gray-200 rounded-lg"></div>
        </div>
    </div>
);

export default function HotelDetail() {
    const [queryParams, setQueryParams] = useState({
        propertyId: "",
        city: "",
        checkInDate: "",
        checkOutDate: "",
        rooms: 0,
        adults: 0,
        children: 0,
    });
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
    const [selectedRoomPlans, setSelectedRoomPlans] = useState({});
    const [numberOfNights, setNumberOfNights] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationError, setValidationError] = useState(null);

    console.log(selectedPrice);

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
            address: propertyData?.data?.location?.address
        },
        amenities: getFilteredAmenities(),
        // roomCategories: renderRooms(),
        reviews: [
            {
                name: "John Doe",
                rating: 4,
                comment: "Beautiful hotel with amazing views! Highly recommended."
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
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        // Parse and store the query parameters
        const checkIn = params.get("checkInDate");
        const checkOut = params.get("checkOutDate");

        // Set the dates in state
        if (checkIn) setStartDate(new Date(checkIn));
        if (checkOut) setEndDate(new Date(checkOut));

        setQueryParams({
            propertyId: params.get("propertyId") || "",
            city: params.get("city") || "",
            checkInDate: checkIn || "",
            checkOutDate: checkOut || "",
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



    const formatDateToYYYYMMDD = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // Helper function to get meal plan description
    const getMealPlanDescription = (plan) => {
        switch (plan) {
            case 'EP':
                return 'European Plan • Room only (no meals included)';
            case 'AP':
                return 'American Plan • All meals included (breakfast, lunch, and dinner)';
            case 'CP':
                return 'Continental Plan • Breakfast included';
            case 'MAP':
                return 'Modified American Plan • Breakfast and dinner included';
            case 'Special Rate - CP':
                return 'Special Rate with Continental Plan • Breakfast included';
            case 'Special Rate - EP':
                return 'Special Rate with European Plan • Room only (no meals included)';
            default:
                return '';
        }
    };

    useEffect(() => {
        if (startDate && endDate) {
            const nights = calculateDaysDifference(startDate, endDate);
            setNumberOfNights(nights);
        }
    }, [startDate, endDate]);

    // Add this validation helper function
    const validateRoomRequirements = () => {
        const requiredRooms = parseInt(queryParams.rooms) || calculateMinimumRooms(queryParams.adults, queryParams.children);
        const currentTotalRooms = Object.values(selectedRoomPlans).reduce(
            (sum, plans) => sum + plans.reduce((roomSum, plan) => roomSum + plan.count, 0),
            0
        );

        if (currentTotalRooms < requiredRooms) {
            return {
                isValid: false,
                message: `You need to select at least ${requiredRooms} room(s) for ${queryParams.adults} adults and ${queryParams.children} children`
            };
        }
        return { isValid: true, message: '' };
    };

    // Update handleRoomSelection function
    const handleRoomSelection = (room, plan, rate) => {
        setSelectedRoomPlans(prev => {
            const currentRoomPlans = prev[room] || [];
            const existingPlanIndex = currentRoomPlans.findIndex(p => p.plan === plan);
            
            if (existingPlanIndex >= 0) {
                const updatedPlans = [...currentRoomPlans];
                const newCount = updatedPlans[existingPlanIndex].count + 1;
                
                // Calculate base rate and extra charges
                const baseRate = rate?.value || 0;
                const extraCharges = calculateExtraCharges(baseRate, queryParams.adults, queryParams.children);
                const totalRatePerNight = baseRate + extraCharges;

                if (newCount <= 5) { // Max 5 rooms per plan
                    updatedPlans[existingPlanIndex] = {
                        ...updatedPlans[existingPlanIndex],
                        count: newCount,
                        rate: totalRatePerNight
                    };
                    return { ...prev, [room]: updatedPlans };
                }
                return prev;
            } else {
                const baseRate = rate?.value || 0;
                const extraCharges = calculateExtraCharges(baseRate, queryParams.adults, queryParams.children);
                const totalRatePerNight = baseRate + extraCharges;

                return {
                    ...prev,
                    [room]: [...currentRoomPlans, { 
                        plan, 
                        rate: totalRatePerNight,
                        count: 1,
                        baseRate: baseRate
                    }]
                };
            }
        });

        // Validate room requirements after selection
        const validation = validateRoomRequirements();
        setValidationError(validation.message);
    };

    const handleDecreaseRoom = (room, plan) => {
        setSelectedRoomPlans(prev => {
            const currentRoomPlans = prev[room] || [];
            const existingPlanIndex = currentRoomPlans.findIndex(p => p.plan === plan);
            
            if (existingPlanIndex >= 0) {
                const updatedPlans = [...currentRoomPlans];
                if (updatedPlans[existingPlanIndex].count > 1) {
                    updatedPlans[existingPlanIndex].count -= 1;
                    return { ...prev, [room]: updatedPlans };
                } else {
                    return {
                        ...prev,
                        [room]: currentRoomPlans.filter(p => p.plan !== plan)
                    };
                }
            }
            return prev;
        });
    };

    const calculateTotalPrice = () => {
        let total = 0;
        Object.entries(selectedRoomPlans).forEach(([_, plans]) => {
            plans.forEach(plan => {
                // Rate already includes extra charges from handleRoomSelection
                total += plan.rate * plan.count * numberOfNights;
            });
        });
        return total;
    };

    // Update handleReservation function
    const handleReservation = async () => {
        setIsSubmitting(true);

        try {
            // Prepare reservation data
            const reservationData = {
                propertyId: queryParams.propertyId,
                checkInDate: formatDateToYYYYMMDD(startDate || new Date(queryParams.checkInDate)),
                checkOutDate: formatDateToYYYYMMDD(endDate || new Date(queryParams.checkOutDate)),
                numberOfNights,
                totalAmount: calculateTotalPrice(),
                rooms: Object.entries(selectedRoomPlans).map(([roomName, plans]) => 
                    plans.map(plan => ({
                        roomName,
                        planName: plan.plan,
                        quantity: plan.count,
                        ratePerNight: plan.rate,
                        totalAmount: plan.rate * plan.count * numberOfNights
                    }))
                ).flat(),
                guestDetails: {
                    adults: queryParams.adults,
                    children: queryParams.children
                }
            };

            // Make the API call
            const response = await fetch('http://localhost:3000/api/bookings/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData)
            });

            if (!response.ok) {
                throw new Error('Booking failed');
            }

            const result = await response.json();
            
            // Redirect to payment/confirmation page with booking details
            window.location.href = `/booking-confirmation?bookingId=${result.bookingId}&totalAmount=${calculateTotalPrice()}`;
        } catch (error) {
            console.error('Reservation failed:', error);
            alert('Failed to make reservation. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateMinimumRooms = (adults, children) => {
        if (adults <= 2 && children <= 2) return 1;
        if (adults === 3 || adults === 4) return 2;
        if (adults <= 2 && children > 2) return 2;
        return Math.ceil(adults / 2);
    };


    const calculateExtraCharges = (baseRate, adults, children) => {
        let extraCharges = 0;
        
        // Extra adult charges (beyond 2 adults)
        if (adults > 2) {
            extraCharges += (adults - 2) * (baseRate * 0.3); // 30% of base rate
        }
        
        // Child charges
        if (children > 0) {
            extraCharges += children * (baseRate * 0.15); // 15% of base rate
        }
        
        return extraCharges;
    };

    return (
        <>
            <DemoNavbar />
            <div className={`${styles.hotelDetail} max-w-[1400px] mx-auto`}>
                <div className="container-fluid">
                    <div className="row">
                        {/* Hotel Images Section */}
                        <section className="col-md-12 mt-[120px]">
                            {!hotel?.images ? (
                                <ImageGallerySkeleton />
                            ) : (
                                <>
                                    <div className={styles.imageGrid}>
                                        <div className={`${styles.imageBox} ${styles.largeImage}`}>
                                            <img
                                                src={hotel?.images?.[0]}
                                                alt="Hotel view 1"
                                                className={styles.hotelImage}
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.src = '/path/to/fallback-image.jpg'; // Add a fallback image
                                                }}
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
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.target.src = '/path/to/fallback-image.jpg';
                                                        }}
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
                                </>
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
                            <section className="bg-white p-6 rounded-5 shadow-lg mb-4 mt-4">
                                {/* Hotel Name and Rating */}
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-3xl font-bold text-gray-800">{hotel?.name}</h2>
                                    <div className="flex items-center gap-2">
                                        <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                                            4.8/5
                                        </div>
                                        <div className="text-yellow-400 text-xl">
                                            ★★★★★
                                        </div>
                                    </div>
                                </div>

                                {/* Description Card */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <p className="text-gray-700 leading-relaxed mb-2">
                                        {showFullDescription
                                            ? hotel.description
                                            : truncateDescription(hotel.description, 30)}
                                    </p>
                                    <button
                                        onClick={handleToggleDescription}
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                                    >
                                        {showFullDescription ? (
                                            <>
                                                Show Less
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                                </svg>
                                            </>
                                        ) : (
                                            <>
                                                Read More
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Contact Information Grid */}
                                <div className="grid md:grid-cols-3 gap-4">
                                    {/* Phone */}
                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Phone</div>
                                            <div className="font-medium text-gray-900">{hotel.contact.phone}</div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Email</div>
                                            <div className="font-medium text-gray-900 break-all">{hotel.contact.email}</div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Address</div>
                                            <div className="font-medium text-gray-900">{hotel.contact.address}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                                    <button className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Contact Now
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        Get Directions
                                    </button>
                                </div>
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
                                                    className={`w-full bg-white rounded-xl transition-all duration-200 mb-3 ${isExpanded
                                                            ? "shadow-lg border-2 border-blue-100"
                                                            : "border border-gray-100 hover:border-blue-100 hover:shadow-md"
                                                        }`}
                                                >
                                                    {/* Room Header */}
                                                    <div
                                                        className="flex items-center justify-between p-4 cursor-pointer"
                                                        onClick={() => handleExpandRoom(room)}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex flex-col">
                                                                <span className="text-lg font-semibold text-gray-800">
                                                                    {room}
                                                                </span>
                                                                <span className="text-sm text-gray-500">
                                                                    Max Occupancy: 2 Adults
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                                            <svg width="12" height="12" viewBox="0 0 12 12">
                                                                <path
                                                                    d="M2 4L6 8L10 4"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    fill="none"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    {/* Expanded Content */}
                                                    {isExpanded && (
                                                        <div className="px-4 pb-4">
                                                            <div className="h-px bg-gray-100 mb-4" /> {/* Divider */}
                                                            <div className="space-y-3">
                                                                {roomData?.rates &&
                                                                    Object.entries(roomData.rates).map(([plan, planData]) => {
                                                                        const twoPerson = Object.entries(planData).find(
                                                                            ([personCount]) => personCount === "2"
                                                                        );

                                                                        let rate = null;
                                                                        if (twoPerson) {
                                                                            const [, rates] = twoPerson;
                                                                            rate = Array.isArray(rates)
                                                                                ? rates.find(r => formatDateToISO(r?.date) === formattedCheckInDate)
                                                                                : null;
                                                                        }

                                                                        const selectedCount = selectedRoomPlans[room]?.find(p => p.plan === plan)?.count || 0;

                                                                        return rate ? (
                                                                            <div
                                                                                key={plan}
                                                                                className="relative flex items-center p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-sm"
                                                                            >
                                                                                {/* Plan Details */}
                                                                                <div className="flex-grow">
                                                                                    <div className="flex items-center gap-2 mb-1">
                                                                                        <span className="font-medium text-gray-900">{plan}</span>
                                                                                    </div>
                                                                                    <div className="text-sm text-gray-600 mb-1">
                                                                                        {getMealPlanDescription(plan)}
                                                                                    </div>
                                                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                        </svg>
                                                                                        Non-refundable
                                                                                    </div>
                                                                                </div>

                                                                                {/* Price and Room Selection */}
                                                                                <div className="flex flex-col items-end gap-2">
                                                                                    <span className="text-lg font-semibold text-gray-900">
                                                                                        ₹{rate?.value?.toLocaleString() || "N/A"}
                                                                                        <span className="text-xs text-gray-500 ml-1">per night</span>
                                                                                    </span>
                                                                                    
                                                                                    <div className="flex items-center gap-2">
                                                                                        {selectedCount > 0 ? (
                                                                                            <>
                                                                                                <button
                                                                                                    onClick={() => handleDecreaseRoom(room, plan)}
                                                                                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50"
                                                                                                >
                                                                                                    -
                                                                                                </button>
                                                                                                <span className="w-8 text-center">{selectedCount}</span>
                                                                                            </>
                                                                                        ) : null}
                                                                                        <button
                                                                                            onClick={() => handleRoomSelection(room, plan, rate)}
                                                                                            className={`${
                                                                                                selectedCount > 0 
                                                                                                    ? "w-8 h-8 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50"
                                                                                                    : "px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                                                                                            }`}
                                                                                        >
                                                                                            {selectedCount > 0 ? "+" : "Select"}
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) : null;
                                                                    })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>

                            {/* Cancellation Policy Section */}
                            <section className="bg-white p-6 rounded-5 shadow-lg mb-4 mt-3">
                                <div className="flex items-center gap-3 mb-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h2 className="text-xl font-bold text-gray-800">Cancellation Policy</h2>
                                </div>

                                <div className="space-y-4">
                                    {/* Free Cancellation Period */}
                                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                        <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-green-700">Free Cancellation</h3>
                                            <p className="text-green-600 text-sm">Cancel more than 24 hours before check-in for a full refund</p>
                                        </div>
                                    </div>

                                    {/* Partial Refund Period */}
                                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                                        <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-yellow-700">Partial Refund</h3>
                                            <p className="text-yellow-600 text-sm">Cancel within 24 hours of check-in and get a 50% refund</p>
                                        </div>
                                    </div>

                                    {/* No Refund Period */}
                                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                        <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-red-700">No Refund</h3>
                                            <p className="text-red-600 text-sm">No refund for no-shows or same-day cancellations</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Policy Details */}
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-600 font-medium">Important Notes:</span>
                                    </div>
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-7">
                                        <li>All times are calculated based on the property's local time zone</li>
                                        <li>Refunds will be processed within 5-7 business days</li>
                                        <li>Special circumstances may be considered for medical emergencies</li>
                                    </ul>
                                </div>
                            </section>
                            {/* Reviews Section */}
                            <section className="bg-white mt-4 p-6 rounded-5 shadow-lg mb-4">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Guest Reviews</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-3xl font-bold text-blue-600">4.8</span>
                                            <div>
                                                <div className="flex text-yellow-400 mb-1">
                                                    {"★".repeat(5)}
                                                </div>
                                                <span className="text-gray-600 text-sm">Based on {hotel.reviews.length} reviews</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                                        Write a Review
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {hotel.reviews.length > 0 ? (
                                        hotel.reviews.map((review, index) => (
                                            <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                                                <div className="flex items-start gap-4">
                                                    <img 
                                                        src={`https://ui-avatars.com/api/?name=${review.name}&background=random`}
                                                        alt={review.name}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div>
                                                                <h5 className="font-semibold text-gray-900">{review.name}</h5>
                                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                    <span className="flex text-yellow-400">
                                                                        {"★".repeat(review.rating)}
                                                                        {"☆".repeat(5 - review.rating)}
                                                                    </span>
                                                                    <span>•</span>
                                                                    <span>Stayed in June 2023</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <button className="text-gray-400 hover:text-blue-600">
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" 
                                                                        />
                                                                    </svg>
                                                                </button>
                                                                <span className="text-sm text-gray-500">Helpful</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                                        {review.images && (
                                                            <div className="flex gap-2 mt-3">
                                                                {review.images.map((img, idx) => (
                                                                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                                                    <img 
                                                                        key={idx}
                                                                        src={img}
                                                                        alt="Review photo"
                                                                        className="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-90"
                                                                    />
                                                                ))}
                                                            </div>
                                                        )}
                                                        {review.response && (
                                                            <div className="mt-4 pl-4 border-l-4 border-gray-100">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <img 
                                                                        src="/path-to-hotel-logo.png"
                                                                        alt="Hotel response"
                                                                        className="w-8 h-8 rounded-full"
                                                                    />
                                                                    <div>
                                                                        <h6 className="font-semibold">Response from {hotel.name}</h6>
                                                                        <span className="text-sm text-gray-500">Responded 2 days ago</span>
                                                                    </div>
                                                                </div>
                                                                <p className="text-gray-600">{review.response}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                                                />
                                            </svg>
                                            <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                                            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                                                Write a Review
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {hotel.reviews.length > 3 && (
                                    <div className="text-center mt-6">
                                        <button className="px-6 py-2 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors">
                                            Show all {hotel.reviews.length} reviews
                                        </button>
                                    </div>
                                )}
                            </section>
                        </div>
                        {/* Reservation and Price Section */}
                        <div className="col-md-4 mt-4">
                            <div className="bg-white p-4 rounded-3 shadow-lg sticky-section">
                                {/* Your Selection Summary */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold mb-3">Your Selection</h3>
                                    {Object.entries(selectedRoomPlans).map(([room, plans]) => (
                                        plans.map(plan => (
                                            <div key={`${room}-${plan.plan}`} className="flex justify-between items-center mb-2 pb-2 border-b">
                                                <div>
                                                    <div className="font-medium">{room}</div>
                                                    <div className="text-sm text-gray-600">{plan.plan}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {plan.count} {plan.count === 1 ? 'room' : 'rooms'} × {numberOfNights} {numberOfNights === 1 ? 'night' : 'nights'}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-semibold">
                                                        ₹{(plan.rate * plan.count * numberOfNights).toLocaleString()}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        ₹{plan.rate.toLocaleString()} per night
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ))}
                                    
                                    <div className="mt-4 pt-3 border-t">
                                        <div className="flex justify-between items-center font-semibold text-lg">
                                            <span>Total Price</span>
                                            <span>₹{calculateTotalPrice().toLocaleString()}</span>
                                        </div>
                                        <div className="text-sm text-gray-500">Including taxes and fees</div>
                                    </div>
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
                                                value={formatDateToYYYYMMDD(queryParams?.checkInDate)}
                                                onChange={(e) => setStartDate(new Date(e.target.value))}
                                                min={formatDateToYYYYMMDD(new Date())}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="checkoutDate" className="form-label">
                                                Check-out Date
                                            </label>
                                            <input
                                                type="date"
                                                id="checkoutDate"
                                                value={formatDateToYYYYMMDD(queryParams?.checkOutDate)}
                                                className="form-control shadow-sm"
                                                required
                                                onChange={(e) => setEndDate(new Date(e.target.value))}
                                                min={formatDateToYYYYMMDD(startDate || new Date())}
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
                                                defaultValue="14:00"
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
                                                defaultValue="11:00"
                                            />
                                        </div>
                                    </div>

                                    {/* Guest Details Summary */}
                                    <div className="mb-4">
                                        <div className="text-sm">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Adults:</span>
                                                <span>{queryParams.adults}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Children:</span>
                                                <span>{queryParams.children}</span>
                                            </div>
                                            {numberOfNights > 0 && (
                                                <div className="d-flex justify-content-between">
                                                    <span>Duration:</span>
                                                    <span>{numberOfNights} {numberOfNights === 1 ? 'night' : 'nights'}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button 
                                        type="button" 
                                        className="btn btn-primary w-100 py-2"
                                        disabled={Object.keys(selectedRoomPlans).length === 0 || isSubmitting}
                                        onClick={handleReservation}
                                    >
                                        {isSubmitting ? (
                                            <div className="d-flex align-items-center justify-content-center gap-2">
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Processing...
                                            </div>
                                        ) : (
                                            'Confirm Reservation'
                                        )}
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

              .animate-pulse {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
              }

              @keyframes pulse {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: .5;
                }
              }

              .grid {
                display: grid;
              }

              .gap-4 {
                gap: 1rem;
              }

              .grid-cols-4 {
                grid-template-columns: repeat(4, minmax(0, 1fr));
              }

              .col-span-2 {
                grid-column: span 2 / span 2;
              }

              .row-span-2 {
                grid-row: span 2 / span 2;
              }

              .bg-gray-200 {
                background-color: #E5E7EB;
              }

              .rounded-lg {
                border-radius: 0.5rem;
              }

              .h-[400px] {
                height: 400px;
              }
            `}</style>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
