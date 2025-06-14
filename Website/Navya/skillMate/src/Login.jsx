import React from "react";
import { Link } from "react-router-dom";
import { auth, googleProvider, signInWithPopup } from "./firebase";



function LoginBox({ onClose, onSignUp }) {
  // Google Sign-In handler
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect or close modal as needed
      window.location.href = "/home"; // or use navigate if using React Router
    } catch (error) {
      alert("Google sign-in failed: " + error.message);
    }
  };

  // Apple Sign-In handler (placeholder)
  const handleAppleSignIn = () => {
    // Apple Sign-In for web requires a backend and Apple Developer setup.
    // You would typically redirect to your backend's Apple auth endpoint.
    window.location.href = "https://appleid.apple.com/auth/authorize?..."; // Replace with your Apple OAuth URL
  };

  return (
    <div
      style={{
        width: 400,
        padding: 32,
        background: "black",
        borderRadius: 10,
        boxShadow: "0px 5px 15px rgba(0,0,0,0.35)",
        color: "#EFEFEF",
        position: "relative",
        margin: "40px auto",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          right: 16,
          top: 16,
          background: "transparent",
          border: "none",
          color: "#FFF",
          fontSize: 20,
          cursor: "pointer",
        }}
        aria-label="Close"
      >
        ×
      </button>
      <h2 style={{ textAlign: "center", fontWeight: 900, fontSize: 28, marginBottom: 24 }}>
        Welcome back
      </h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 20,
            border: "1px solid #C0C0C0",
            marginBottom: 16,
            fontSize: 14,
          }}
        />
        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 20,
            border: "1px solid #C0C0C0",
            marginBottom: 8,
            fontSize: 14,
          }}
        />
        <div style={{ textAlign: "right", fontSize: 10, color: "#747474", marginBottom: 16 }}>
          Forgot Password?
        </div>
        <Link to='/home'>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#C390B4",
            color: "white",
            border: "none",
            borderRadius: 20,
            fontWeight: "bold",
            fontSize: 15,
            marginBottom: 16,
            boxShadow: "0px 3px 8px rgba(0,0,0,0.24)",
            cursor: "pointer",
          }}
          onClick={(e) => e.preventDefault()}
        >
          Log in
        </button>
        </Link>
        <div style={{ textAlign: "center", fontSize: 10, color: "#F5EEEE", marginBottom: 8 }}>
          Don't have an account?{" "}
          <span
            style={{
              color: "#FFBEEF",
              fontWeight: 900,
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={onSignUp}
          >
            Sign up
          </span>
        </div>
        <button
          type="button"
          onClick={handleAppleSignIn}
          style={{
            width: "100%",
            padding: "10px",
            background: "#FFF",
            color: "#000",
            border: "2px solid #000",
            borderRadius: 20,
            marginBottom: 8,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Log in with Apple
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          style={{
            width: "100%",
            padding: "10px",
            background: "#FFF",
            color: "#000",
            border: "2px solid #747474",
            borderRadius: 20,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Log in with Google
        </button>
      </form>
    </div>
  );
}

export default LoginBox;
