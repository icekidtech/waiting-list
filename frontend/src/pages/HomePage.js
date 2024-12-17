import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false); // Close menu after navigation
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      {/* Header Section */}
      <header style={{ position: 'relative', padding: '20px', backgroundColor: '#f4f4f4' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#2a2a2a' }}>Brink Gaming</h1>
          <h3 style={{ color: '#555' }}>Your Gateway to the Future of Gaming</h3>
        </div>

        {/* Dropdown Menu */}
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <button
            onClick={toggleMenu}
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Menu
          </button>
          {menuOpen && (
            <ul
              style={{
                position: 'absolute',
                top: '40px',
                right: '0',
                backgroundColor: '#fff',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                listStyle: 'none',
                padding: '10px',
                borderRadius: '5px',
                width: '150px',
                zIndex: 10,
              }}
            >
              <li
                style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ccc' }}
                onClick={() => handleNavigation('/about')}
              >
                About
              </li>
              <li
                style={{ padding: '10px', cursor: 'pointer' }}
                onClick={() => handleNavigation('/signup')}
              >
                Sign Up
              </li>
            </ul>
          )}
        </div>
      </header>

      {/* Intro Section */}
      <section style={{ textAlign: 'center', margin: '20px auto', maxWidth: '700px' }}>
        <p style={{ fontSize: '1rem' }}>
          Welcome to <strong>Brink Gaming</strong>! Our platform is set to redefine online gaming
          with interactive experiences, incentives, and rewards. Join the waiting list now to
          receive early access and exclusive perks, such as token airdrops to your Spear Wallet.
        </p>
      </section>

      {/* Game Demos Section */}
      <section
        style={{
          margin: '30px 0',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          textAlign: 'center',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Game Demos</h2>
        <p>Here is a glimpse of the games Brink Gaming has to offer:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {/* Placeholder Images for Game Demos */}
          <div>
            <img
              src="https://via.placeholder.com/150"
              alt="Game Demo 1"
              style={{ borderRadius: '8px' }}
            />
            <p>Game 1</p>
          </div>
          <div>
            <img
              src="https://via.placeholder.com/150"
              alt="Game Demo 2"
              style={{ borderRadius: '8px' }}
            />
            <p>Game 2</p>
          </div>
          <div>
            <img
              src="https://via.placeholder.com/150"
              alt="Game Demo 3"
              style={{ borderRadius: '8px' }}
            />
            <p>Game 3</p>
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section style={{ textAlign: 'center', margin: '30px 0' }}>
        <h2 style={{ fontSize: '1.8rem' }}>Sign Up for Early Access</h2>
        <p>
          By signing up for the waiting list, you'll unlock benefits like exclusive token
          airdrops, early platform access, and more exciting incentives!
        </p>
        <button
          onClick={() => handleNavigation('/signup')}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Join the Waiting List
        </button>
      </section>

      {/* Contact Form */}
      <section
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#f4f4f4',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Contact Us</h2>
        <form>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
              Your Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
              Your Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>
              Message:
            </label>
            <textarea
              id="message"
              placeholder="Enter your question or message"
              rows="5"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              color: '#fff',
              backgroundColor: '#28a745',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'block',
              margin: '0 auto',
            }}
          >
            Submit
          </button>
        </form>
      </section>

      {/* Footer Section */}
      <footer
        style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#333',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <div>
          <h3>Connect with Us</h3>
          <p>Links to X, Facebook, Instagram, Telegram</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;