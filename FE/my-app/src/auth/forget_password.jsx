 import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Password reset requested for:", { email });
        // Simulate API call and success state
        setIsSubmitted(true);
    };

    return (
        <div className="apple-login-container">
            <div className="apple-login-card">
                <h1 className="apple-login-title">Reset Password</h1>
                
                {!isSubmitted ? (
                    <>
                        <p className="apple-login-subtitle">
                            Enter the email address associated with your account, and we'll send you a link to reset your password.
                        </p>
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
                                    aria-label="Email Address for Password Reset"
                                />
                            </div>
                            
                            <button type="submit" className="apple-button-primary">
                                Send Reset Link
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{ animation: "cardEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
                        <p className="apple-login-subtitle" style={{ color: "#1d1d1f", fontWeight: "500", padding: "16px 0", fontSize: "17px" }}>
                            If an account exists for <strong>{email}</strong>, you will receive password reset instructions shortly.
                        </p>
                        <button 
                            className="apple-button-primary"
                            onClick={() => setIsSubmitted(false)}
                            style={{ 
                                width: "100%", 
                                background: "transparent", 
                                border: "1px solid #0071e3", 
                                color: "#0071e3", 
                                boxShadow: "none" 
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "rgba(0, 113, 227, 0.05)" }}
                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
                        >
                            Try another email
                        </button>
                    </div>
                )}
                
                <div style={{ marginTop: "32px" }}>
                    <Link to="/login" className="apple-link" style={{ marginTop: 0 }}>
                        &larr; Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
