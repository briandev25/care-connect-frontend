"use client";

import React from "react";
import styles from "../login/login.module.css";
import Link from "next/link";
import LoginForm from "../../../Components/LoginForm";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

function Userlogin() {
  const handleLoginSuccess = (data) => {
    // Handle successful login if needed
    console.log("Login successful:", data);
  };

  const handleGoogleLogin = () => {
    signIn("google");
  };

  return (
    <div className={styles.signInPage}>
      {/* Side containing the form */}
      <div className={styles.formComponent}>
        <div className={styles.formInnerWrapper}>
          <div className="flex items-center">
            <Link href="/">
              <h3 className=" text-[28px] font-bold">
                <span className="text-[#0B3C41]/30">Care.</span>
                <span className="text-[#0B3C41]">Connect</span>
              </h3>
            </Link>
          </div>
          {/* Pass handleLoginSuccess as onSuccess prop */}
          <div>
            <LoginForm onSuccess={handleLoginSuccess} />
            <div className="flex gap-3 my-10">
              <div className={styles.line}></div>
              <div className="mt-n20">
                <h6>OR</h6>
              </div>
              <div className={styles.line}></div>
            </div>
            <div className={styles.googleLogin}>
              <div
                onClick={handleGoogleLogin}
                className={styles.googleLoginButton}
              >
                <FcGoogle className=" text-2xl" />
                Sign in with Google
              </div>
            </div>
          </div>
          <div className={styles.navigationOption}>
            <p>I don't have an account</p>
            <Link href="/users/signup">
              <div className={styles.registerLink}>SIGN UP</div>
            </Link>
          </div>
        </div>
      </div>
      {/* Side containing the image */}
      <div className={styles.SignInSidebar}>
        <div className={styles.topPart}>
          <h3>Welcome Back</h3>
          <div className={styles.line}></div>
        </div>
        <div className={styles.bottomPart}>
          <h1>SIGN IN</h1>
        </div>
      </div>
    </div>
  );
}

export default Userlogin;
