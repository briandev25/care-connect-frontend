import React from "react";
import styles from "../Styles/HomePage.module.css";
import Link from "next/link";
import Image from "next/image";

function HomepageCategories() {
  const categories = [
    {
      name: "Doctors",
      text: "Find a doctor",
      image: "/images/Doctoalt.png",
      link: "/doctors",
    },
    {
      name: "Hospitals",
      image: "/images/facility-ill.png",
      text: "Find a Hospital",
      link: "/facilities",
    },
  ];
  return (
    <>
      <div className={styles.CategoriesContainer}>
        {categories.map((category, index) => (
          <div className={styles.DocCategory} key={index}>
            <div>
              <h2>{category.name}</h2>
              <Link href={category.link}>
                <p>{category.text}</p>
              </Link>
            </div>
            <div>
              <Image
                src={category.image}
                alt="Care connect doctors"
                width={250}
                height={150}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomepageCategories;
