"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Styles/ProviderCard.module.css";
import LoadingComponents from "./LoadingComponents";

type Provider = {
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
};

function FeaturedProviders() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No access token found");
        setError("No access token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/care/providers", {
          // Adjust the endpoint if necessary
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch providers");
        }

        const data = await response.json();
        setProviders(data.providerlist);
        // Introduce a delay of 3000 milliseconds (3 seconds) before updating state
        setTimeout(() => {
          setProviders(data.providerlist); // Ensure `providerlist` exists in the response
        }, 3000);
      } catch (error) {
        console.error("Error fetching providers:", error);
        setError("Error fetching providers");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleKnowMoreClick = (id: number) => {
    router.push(`/provider/${id}`);
  };

  const renderStars = (rating: number | null) => {
    if (rating === null) {
      return <p>No rating</p>;
    }

    const stars: JSX.Element[] = []; // Explicitly type the array

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

  if (loading) return <LoadingComponents />;
  if (error)
    return <p style={{ textAlign: "center", marginTop: 10 }}>{error}</p>;

  return (
    <div className={styles.FeaturedCardContainer}>
      {providers.map((provider) => (
        <div key={provider.id} className={styles.FeaturedCard}>
          <div>
            <img
              src={provider.profileImage}
              alt={`${provider.name}'s profile`}
            />
          </div>
          <div>
            <div className={styles.featuredDetails}>
              <p className={styles.highlight}>{provider.providerType}</p>
              <div className={styles.stars}>{renderStars(provider.rating)}</div>
            </div>
            <h1>{provider.name}</h1>
          </div>
          <div className={styles.featureCAT}>
            <button
              type="button"
              onClick={() => handleKnowMoreClick(provider.id)}
            >
              Know More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeaturedProviders;
