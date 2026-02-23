"use client"
import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Navbar() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user_token")
 const decoded = jwt.decode(token);
     if (decoded?.email) {
      setUserEmail(decoded.email);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user_token");
    setUserEmail(null);
window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="logo">MyTaskApp</div>

      <div className="nav-right">
        {!userEmail ? (
          <>
          <Link href={"/login"}>   <button className="btn login">Login</button></Link>
          <Link href={"/registration"}><button className="btn register">Register</button></Link> 
          </>
        ) : (
          <>
            <span className="email">{userEmail}</span>
            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}