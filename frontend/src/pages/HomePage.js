import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import game1 from '../assets/images/game1.jpg';
import game2 from '../assets/images/game2.jpg';
import game3 from '../assets/images/game3.jpg';

function HomePage() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navigateToAbout = () => {
    navigate('/about');
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  // Game Demo Data
  const gameDemos = [
    { title: 'Dying Light', image: game1, description: 'Experience an epic adventure in Dying Light!' },
    { title: 'Racing Fever', image: game2, description: 'Discover the challenge and thrill of Racing Fever!' },
    { title: 'Gun Down', image: game3, description: 'Dive into the world of excitement with Gun Down!' },
  ];

  // Auto Slider Effect
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentGameIndex((prevIndex) => (prevIndex + 1) % gameDemos.length);
    }, 5000);

    return () => clearInterval(sliderInterval);
  }, [gameDemos.length]);

  return (
    <div>
      {/* Updated Navigation Section */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#f4f4f4',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Title (Top Left) */}
        <h2
          onClick={() => navigate('/')}
          style={{
            margin: 0,
            cursor: 'pointer',
            color: '#007bff',
            fontSize: '1.8rem',
          }}
        >
          Brink Gaming
        </h2>

        {/* Menu Button (Top Right) */}
        <nav style={{ position: 'relative' }}>
          <button
            onClick={toggleMenu}
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Menu
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <ul
              style={{
                position: 'absolute',
                right: 0,
                top: '40px',
                listStyle: 'none',
                backgroundColor: '#fff',
                color: '#333',
                padding: '10px 0',
                margin: 0,
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                width: '150px',
                zIndex: 1000,
              }}
            >
              <li
                style={{
                  padding: '8px 15px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                }}
                onClick={navigateToAbout}
              >
                About
              </li>
              <li
                style={{
                  padding: '8px 15px',
                  cursor: 'pointer',
                }}
                onClick={navigateToSignup}
              >
                Signup
              </li>
            </ul>
          )}
        </nav>
      </header>

      {/* Title Section */}
      <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f4f4f4' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2a2a2a' }}>Brink Gaming Waiting List</h1>
        <h3 style={{ color: '#555' }}>Your Gateway to the Future of Gaming</h3>
        <p style={{ maxWidth: '700px', margin: '10px auto', fontSize: '1rem' }}>
          Welcome to <strong>Brink Gaming Waiting List</strong>! Our platform is set to redefine online gaming
          with interactive experiences, incentives, and rewards. Join the waiting list now to
          receive early access and exclusive perks, such as token airdrops to your Spear Wallet.
        </p>
      </header>

      {/* Game Demo Slider Section */}
      <section
        style={{
          margin: '30px auto',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          textAlign: 'center',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
          borderRadius: '8px',
        }}
      >
        <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Game Demo</h2>
        {/* Auto-Slider */}
        <div>
          <img
            src={gameDemos[currentGameIndex].image}
            alt={gameDemos[currentGameIndex].title}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          <h3 style={{ margin: '10px 0', fontSize: '1.5rem' }}>
            {gameDemos[currentGameIndex].title}
          </h3>
          <p style={{ fontSize: '1rem', color: '#555' }}>
            {gameDemos[currentGameIndex].description}
          </p>
        </div>
        <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#777' }}>
          Slides change every 5 seconds. Stay tuned for more exciting games!
        </p>
      </section>

      {/* Signup Section */}
      <section style={{ textAlign: 'center', margin: '30px 0' }}>
        <h2 style={{ fontSize: '1.8rem' }}>Sign Up for Early Access</h2>
        <p>
          By signing up for the waiting list, you'll unlock benefits like exclusive token
          airdrops, early platform access, and more exciting incentives!
        </p>
        <button
          onClick={handleSignupClick}
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
          <a
            href="https://x.com/your-handle"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: '0 10px', color: '#1DA1F2', textDecoration: 'none' }}
          >
            X (Twitter)
          </a>
          <a
            href="https://facebook.com/your-handle"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: '0 10px', color: '#4267B2', textDecoration: 'none' }}
          >
            Facebook
          </a>
          <a
            href="https://instagram.com/your-handle"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: '0 10px', color: '#C13584', textDecoration: 'none' }}
          >
            Instagram
          </a>
          <a
            href="https://t.me/your-handle"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: '0 10px', color: '#0088cc', textDecoration: 'none' }}
          >
            Telegram
          </a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;