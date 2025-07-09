import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
export default function Landing() {
     const navigate = useNavigate();
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">Travel Ease</div>
        <nav className="nav-links">
        </nav>
        <button className="login-btn" onClick={() => navigate("/login")}>
        Login
        </button>
        <button className="sign-up-btn" onClick={() => navigate("/signup")}>
        Sign Up
        </button>
      </header>

      <main className="hero">
        <h1>Your Journey, Simplified.</h1>
        <p>
          Discover and book flights effortlessly with Travel Ease, your ultimate
          online flight booking platform.
        </p>
      </main>

      <section className="features">
        <h2>Why Choose Travel Ease?</h2>
        <div className="cards">
          <div className="card">
            <span className="icon">✈️</span>
            <h3>Effortless Booking</h3>
            <p>Book your flights in just a few clicks.</p>
          </div>
          <div className="card">
            <span className="icon">💸</span>
            <h3>Best Price Guarantee</h3>
            <p>We compare thousands of airlines to get you the best deals.</p>
          </div>
          <div className="card">
            <span className="icon">🎧</span>
            <h3>24/7 Customer Support</h3>
            <p>Our dedicated team is always here to help you.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
