import React from 'react';

// Example Image Slider Component (assuming you're using a library like Swiper)
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Productpage  ({ hotel })  {
  const {
    images,
    about,
    roomCategories,
    prices,
    cancellationPolicy,
    amenities
  } = hotel;

  return (
    <div className="hotel-detail">
      {/* Image Slider */}
      <section className="slider">
        <Swiper spaceBetween={10} slidesPerView={1}>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Hotel image ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* About Hotel */}
      <section className="about">
        <h2>About the Hotel</h2>
        <p>{about}</p>
      </section>

      {/* Room Categories */}
      <section className="rooms">
        <h2>Room Categories</h2>
        {roomCategories.map((room, index) => (
          <div key={index} className="room-category">
            <h3>{room.name}</h3>
            <p>{room.description}</p>
          </div>
        ))}
      </section>

      {/* Pricing Details */}
      <section className="pricing">
        <h2>Pricing</h2>
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>EP (European Plan)</td>
              <td>{prices.ep}</td>
            </tr>
            <tr>
              <td>CP (Continental Plan)</td>
              <td>{prices.cp}</td>
            </tr>
            <tr>
              <td>MAP (Modified American Plan)</td>
              <td>{prices.map}</td>
            </tr>
            <tr>
              <td>AP (American Plan)</td>
              <td>{prices.ap}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Cancellation Policy */}
      <section className="cancellation-policy">
        <h2>Cancellation Policy</h2>
        <p>{cancellationPolicy}</p>
      </section>

      {/* Amenities */}
      <section className="amenities">
        <h2>Amenities</h2>
        <ul>
          {amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};


