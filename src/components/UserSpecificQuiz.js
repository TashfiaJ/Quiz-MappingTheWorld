import React, { useState, useEffect } from 'react';

function UserSpecificQuiz() {
  const [currentLevel, setCurrentLevel] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Fetch token from local storage
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    console.log(token);
    if (token) {
      // Fetch current level using token
      fetch(`http://localhost:8000/user/${email}/current-level`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch current level');
          }
          return response.json();
        })
        .then(data => setCurrentLevel(data.current_level))
        .catch(error => console.error(error));
    }
  }, [token]);

  const handleLogin = () => {
    // Perform login and retrieve access token
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username: email,
        password: password
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        const { access_token } = data;
        localStorage.setItem('access_token', access_token);
        setToken(access_token);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      {currentLevel ? (
        <p>Current level: {currentLevel}</p>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}

export default UserSpecificQuiz;
