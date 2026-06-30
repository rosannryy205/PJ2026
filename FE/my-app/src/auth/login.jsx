import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login attempt:", { email, password });
    };

    return (
        <div className="apple-login-container">
            <div className="apple-login-card">
                <h1 className="apple-login-title">Welcome Back</h1>
                <p className="apple-login-subtitle">Sign in to explore exclusive collections and premium deals.</p>

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

                    <button type="submit" className="apple-button-primary">
                        Sign In
                    </button>
                </form>
                
                <Link to="/register" className="apple-link">
                    Don't have an account? Create one now.
                </Link>
            </div>
        </div>
    );
}