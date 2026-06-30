import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css"; // Reuse the stunning glassmorphism styles

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verifyCode, setVerifyCode] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Register attempt:", { email, password, confirmPassword, verifyCode });
    };

    return (
        <div className="apple-login-container">
            <div className="apple-login-card">
                <h1 className="apple-login-title">Create Account</h1>
                <p className="apple-login-subtitle">Join us to discover premium products and exclusive offers.</p>

                <form className="apple-login-form" onSubmit={handleSubmit}>
                    <div className="apple-input-group">
                        <label className="apple-input-label" htmlFor="email">Email</label>
                        <input 
                            id="email"
                            type="email" 
                            className="apple-input" 
                            placeholder="Email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="apple-input-group">
                        <label className="apple-input-label" htmlFor="password">Password</label>
                        <input 
                            id="password"
                            type="password" 
                            className="apple-input" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="apple-input-group">
                        <label className="apple-input-label" htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            id="confirmPassword"
                            type="password" 
                            className="apple-input" 
                            placeholder="Confirm Password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="apple-input-group">
                        <label className="apple-input-label" htmlFor="verifyCode">Verification Code</label>
                        <input 
                            id="verifyCode"
                            type="text" 
                            className="apple-input" 
                            placeholder="Enter verification code" 
                            value={verifyCode}
                            onChange={(e) => setVerifyCode(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="apple-button-primary">
                        Sign Up
                    </button>
                </form>
                
                <Link to="/login" className="apple-link">
                    Already have an account? Sign in.
                </Link>
            </div>
        </div>
    );
}