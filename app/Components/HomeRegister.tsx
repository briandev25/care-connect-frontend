import React from "react";
import styles from "../Styles/HomePage.module.css";
import Link from "next/link";
import Image from "next/image";

function HomeRegister() {
  return (
    <div className={styles.registertext}>
      <div>
        <Image
          src="/images/registerfacility.png"
          alt="registration-care-connect-cat"
          width={550}
          height={350}
        />
      </div>

      <div className={styles.description}>
        <div className="text-start lg:text-start">
          <h1>
            Would you like to be <br></br>featured as a <br></br>health provider
            ?
          </h1>
        </div>

        <div className=" flex gap-3 mt-10">
          <Link className={styles.facilitybtn} href="/register">
            <button>Get Started Here</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeRegister;
