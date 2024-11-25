// components/FloatIcon.js
import React from 'react';
import { FaWhatsapp, FaRegClipboard } from 'react-icons/fa';
import styles from './Search.module.css';
import Modalss from "./Modalss";

const FloatIcon = () => {
    const phoneNumber = "+919805096956"; 
    const message = "Hello! I would like to inquire about Hotel Booking.";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className={styles.container}>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={`${styles.iconContainer} ${styles.whatsapp}`}>
                <FaWhatsapp className={styles.icon} />
                <span className={styles.text}></span>
            </a>
            <div className={`${styles.iconContainer} ${styles.query}`}>
                <Modalss />
                <span className={styles.text}></span>
            </div>
        </div>
    );
};

export default FloatIcon;
