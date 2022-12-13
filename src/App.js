import React, { useState } from 'react';

const initialUserData = {
  email: '',
  password: '',
  passwordConfirm: '',
};

function App() {
  const [userData, setUserData] = useState(initialUserData);
  const [error, setError] = useState('');

  function handleChange(event) {
    const { value, name } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setError('');
    
    if(!userData.email.includes('@'))
      setError('Invalid Email! Please, enter your email correctly.');
    else if(userData.password.length < 5)
      setError('Invalid Password! Minimum length of passwords is 5 characters.');
    else if(userData.password !== userData.passwordConfirm)
      setError('Passwords do not match! Please, make sure you know what you are entering as password.');
  }
  
  return (
    <div>

      <form onSubmit={handleSubmit} noValidate>

        <div>
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={userData.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={userData.password}
          />
        </div>

        <div>
          <label htmlFor="password-confirm">Confirm password:</label>
          <input
            type="password"
            id="password-confirm"
            name="passwordConfirm"
            onChange={handleChange}
            value={userData.passwordConfirm}
          />
        </div>

        {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}

        <button>Submit</button>

      </form>
      
    </div>
  );
}

export default App; 
