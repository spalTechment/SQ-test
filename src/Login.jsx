import { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
      console.log('Login successful:', { email, password });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="login-container">
        <div className="success-message">
          <h2>Login Successful!</h2>
          <p>Welcome, {email}</p>
          <button onClick={resetForm} className="btn-reset">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className={errors.email ? 'input-error' : ''}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={errors.password ? 'input-error' : ''}
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="btn-submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
