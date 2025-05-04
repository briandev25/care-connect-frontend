"use client";
import React from "react";
import Link from "next/link";
import styles from "./signup.module.css";
import SignUpForm from "../../../Components/SignUpForm";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

function UserSignup() {
  const handleGoogleSignUp = () => {
    signIn("google");
  };

  return (
    <div className={styles.signupPage}>
      {/* Side containing the form */}
      <div className={styles.formComponent}>
        <div className={styles.formInnerContainer}>
          <div className="flex items-center">
            <Link href="/">
              <h3 className=" text-[28px] font-bold">
                <span className="text-[#0B3C41]/30">Care.</span>
                <span className="text-[#0B3C41]">Connect</span>
              </h3>
            </Link>
          </div>

          <SignUpForm />
          <div className="flex gap-3 my-10">
            <div className={styles.line}></div>
            <div className="mt-n20">
              <h6>OR</h6>
            </div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.googleLogin}>
            <div onClick={handleGoogleSignUp} className={styles.googleButton}>
              <FcGoogle className=" text-2xl" />
              Sign up with Google
            </div>
          </div>

          <div className={styles.navigationOption}>
            <p>I have an account</p>
            <Link href="/users/login">
              <div className={styles.loginLink}>Login</div>
            </Link>
          </div>
        </div>
      </div>
      {/* Side containing the image */}
      <div className={styles.SignupSidebar}>
        <div className={styles.topPart}>
          <h3>Welcome</h3>
          <div className={styles.line}></div>
        </div>
        <div className={styles.bottomPart}>
          <h1>SIGN UP</h1>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
