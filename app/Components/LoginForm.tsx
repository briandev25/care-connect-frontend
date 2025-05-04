"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import styles from "../Styles/Users.module.css";

interface LoginFormProps {
  onSuccess: (data: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Use usePathname

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/care/login", { email, password });
      const data = response.data;
      // Store items in localStorage
      localStorage.setItem("fullname", data.fullname);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("role", data.role);
      // Trigger success callback
      onSuccess(data);
      // Redirect based on role
      if (data.role === "admin") {
        router.push("/admin");
      } else if (data.role === "super_admin") {
        router.push("/superadmin");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.SignInform}>
        <div className={styles.inputOption}>
          <h6>Email</h6>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputOption}>
          <h6>Password</h6>

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button className={styles.SignInbutton} type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
