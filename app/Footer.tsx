import React from "react";
import styles from "./Styles/footer.module.css";

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div>
        <div className={styles.shorcuts}>
          <div>
            <h3>SHORTCUTS</h3>
            <ul>
              <li>Home </li>
              <li>Find your doctor</li>
              <li>Register Facility</li>
              <li>Register Practitioners</li>
            </ul>
          </div>

          <div>
            <h3>POLICIES</h3>
            <ul>
              <li>Tearms and conditions </li>
              <li>Privacy policy</li>
              <li>Registartion policy</li>
            </ul>
          </div>

          <div>
            <h3>SUPPORT</h3>

            <ul>
              <li>Email </li>
              <li>Phone Number</li>
            </ul>
          </div>
        </div>

        <div>
          <h3>Subcribe To our Newsletter</h3>
          <div className="flex">
            <input type="text" placeholder="email address"></input>
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div>
        <img
          src="/images/footercontactus.jpg"
          alt="care connect footer image"
        />
      </div>
    </div>
  );
}

export default Footer;
