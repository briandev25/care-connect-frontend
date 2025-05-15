"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../Styles/ProviderCard.module.css";
import Filters from "./DoctorsFilter";
import LoadingComponents from "../LoadingComponents";

type Doctor = {
  bio: string;
  reg_date: string;
  email: string;
  location: string;
  phoneNumber: string;
  id: number;
  name: string;
  services: string[];
  providerType: string;
  profileImage: string;
  rating: number | null;
  gender: string;
};

const ITEMS_PER_PAGE = 9;

function ProviderDoctorListing() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genderFilter, setGenderFilter] = useState<string[]>([]);
  const [ratingRangeFilter, setRatingRangeFilter] = useState<
    [number, number] | null
  >(null);
  const [servicesFilter, setServicesFilter] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No access token found");
        setLoading(false);
        return;
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Introduce a delay for the loading state

        const response = await fetch("care/provider/doctors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();
        setTimeout(() => {
          setDoctors(data.Doctors);
          setLoading(false); // Set loading to false after data is fetched
        }, 3000);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      }
    };

    fetchDoctors();
  }, []);

  const renderStars = (rating: number | null) => {
    if (rating === null) {
      return <p>No rating</p>;
    }

    const stars: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < rating ? styles.filledStar : styles.emptyStar}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleKnowMoreClick = (id: number) => {
    router.push(`/provider/${id}`);
  };

  const truncateBio = (bio: string) => {
    const maxLength = 150;
    if (bio.length > maxLength) {
      return bio.slice(0, maxLength) + "...";
    }
    return bio;
  };

  const applyFilters = (doctor: Doctor) => {
    if (genderFilter.length > 0 && !genderFilter.includes(doctor.gender))
      return false;
    if (
      ratingRangeFilter &&
      (doctor.rating === null ||
        doctor.rating < ratingRangeFilter[0] ||
        doctor.rating > ratingRangeFilter[1])
    )
      return false;
    if (
      servicesFilter.length > 0 &&
      !servicesFilter.some((service) => doctor.services.includes(service))
    )
      return false;
    if (
      searchTerm &&
      !doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  };

  const handleClearFilters = () => {
    setGenderFilter([]);
    setRatingRangeFilter(null);
    setServicesFilter([]);
    setSearchTerm("");
    setCurrentPage(1); // Reset to first page after clearing filters
  };

  const indexOfLastDoctor = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstDoctor = indexOfLastDoctor - ITEMS_PER_PAGE;
  const filteredDoctors = doctors.filter(applyFilters);
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.ListingsContainer}>
      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.providerDoctorListing}>
        <div className={styles.ListSidebar}>
          <Filters
            ratingRangeFilter={ratingRangeFilter}
            setRatingRangeFilter={setRatingRangeFilter}
            servicesFilter={servicesFilter}
            setServicesFilter={setServicesFilter}
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
            handleClearFilters={handleClearFilters}
          />
        </div>

        <div className={styles.listingArea}>
          {loading ? (
            <LoadingComponents />
          ) : (
            currentDoctors.map((doctor) => (
              <div key={doctor.id} className={styles.CardContainer}>
                <div className={styles.imageContainer}>
                  <img src={doctor.profileImage} alt={doctor.name} />
                  <h4>{doctor.providerType}</h4>
                </div>
                <div className={styles.contentArea}>
                  <div className={styles.leftContentArea}>
                    <h1>{doctor.name}</h1>
                    <div className={styles.stars}>
                      {renderStars(doctor.rating)}
                    </div>
                    <p>
                      <span>Specialties: </span>
                      {doctor.services.join(" | ")}
                    </p>
                    <p>{truncateBio(doctor.bio)}</p>
                  </div>
                  <div className={styles.rightContentArea}>
                    <div className={styles.knowMoreButton}>Know More</div>
                    <div className={styles.bookNowButton}>Book Now</div>
                  </div>
                </div>
              </div>
            ))
          )}
          {!loading && (
            <div className={styles.pagination}>
              {Array.from(
                { length: Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={index + 1 === currentPage ? styles.active : ""}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProviderDoctorListing;
