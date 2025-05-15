"use client";
import React from "react";
import { IoShareSocialOutline, IoAddOutline } from "react-icons/io5";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import styles from "../../Styles/Singleprovider.module.css";
import { MdVerified } from "react-icons/md";

type Provider = {
  bio: string;
  email: string;
  id: number;
  location: string;
  name: string;
  number: number;
  profileImage: string;
  reg_date: string;
  services: string[];
  status: boolean;
  user_id: number;
  website: string;
  workingHours: string;
  providerType: string; // Added providerType
  providerID: number;
};
type ProviderHeaderProps = {
  provider: Provider;
  showFullBio: boolean;
  onReadMoreToggle: () => void;
};

const ProviderHeader: React.FC<ProviderHeaderProps> = ({
  provider,
  showFullBio,
  onReadMoreToggle,
}) => {
  const truncateBio = (bio: string) => {
    const maxLength = 300;
    if (bio.length > maxLength && !showFullBio) {
      return bio.slice(0, maxLength) + "...";
    }
    return bio;
  };

  const StarRating = ({ rating }) => {
    const stars: JSX.Element[] = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return <div className="flex space-x-2">{stars}</div>;
  };

  return (
    <>
      <div className={styles.TopDetails}>
        <div className={styles.TopContent}>
          <div className=" flex flex-col lg:flex-row items-center gap-5">
            {/* Image */}
            <img src={provider.profileImage} alt={provider.name} />
            {/* Profile Details */}
            <div>
              <span className=" flex items-center gap-1">
                {provider.name}{" "}
                <MdVerified className=" text-[var(--primary-color)]" />{" "}
              </span>
              <h3>Internal Medicine and Neurology</h3>
              <div className=" flex items-center ">
                <StarRating rating={4.5} />
                <span className=" text-[#999] ml-2">(113 reviews)</span>
              </div>
            </div>
          </div>
          <div className={styles.doctorActions}>
            <div className={styles.shareIcon}>
              <IoShareSocialOutline />
            </div>
            <div className={styles.followButton}>
              <IoAddOutline />
              <span>Follow</span>
            </div>
          </div>
        </div>
        <div className={styles.bottomContent}>
          <div className=" hidden lg:block">
            <h3>email</h3>
            <p>{provider.email}</p>
          </div>
          <div className={styles.btmcontentContainer}>
            <h3>Phone Number</h3>
            <p>{provider.number}</p>
          </div>
          <div className={styles.btmcontentContainer}>
            <h3 className=" text-ellipsis">Years of Experience</h3>
            <p>13 years</p>
          </div>
          <div className={styles.btmcontentContainer}>
            <h3>Location</h3>
            <p>{provider.location}</p>
          </div>
        </div>
        <div className={styles.firstSection}>
          <div className="flex flex-col lg:w-[65%]">
            <h3 className=" font-bold text-[20px] mb-2">About John</h3>
            <p className=" text-gray-800">
              {truncateBio(
                " Dr. John Kamau is a highly experienced and compassionate Internal Medicine Specialist with over 18 years of clinicalpractice. Known for her patient-centered approach and clearcommunication, she is dedicated to providing personalized andevidence-based care. Dr. Johnson has a special interest in managing chronic conditions such as diabetes, hypertension, andendocrine disorders, and she continuously updates her knowledgethrough research and continuing education."
              )}
              {showFullBio ? (
                <span
                  className=" text-[#007bff] cursor-pointer"
                  onClick={onReadMoreToggle}
                >
                  Read Less
                </span>
              ) : (
                <span
                  className=" text-[#007bff] cursor-pointer"
                  onClick={onReadMoreToggle}
                >
                  Read More
                </span>
              )}
            </p>
          </div>
          <div className=" flex flex-col gap-2 flex-1 mt-4 lg:mt-0 lg:items-end">
            <h2 className=" font-semibold text-[20px] mb-2">
              Availability and Schedule
            </h2>
            <div className="flex items-center gap-3">
              <h3 className=" text-gray-500">Clinic Days:</h3>
              <p>Monday to Friday</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className=" text-gray-500">Clinic Hours:</h3>
              <p>9:00AM to 4:00PM</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className=" text-gray-500">TeleConsultation:</h3>
              <p>Available via zoom</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderHeader;
