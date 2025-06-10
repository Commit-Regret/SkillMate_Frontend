import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignInBox({ onClose, onAlreadyHaveAccount }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    // Proceed with signup logic (API call, etc.)
    alert("Sign up successful! (Demo)");
    // Optionally close or clear form here
  };

  const passwordsMatch = form.password === form.confirmPassword;

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
        Sign Up
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 20,
            border: "1px solid #C0C0C0",
            marginBottom: 16,
            fontSize: 14,
          }}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 20,
            border: "1px solid #C0C0C0",
            marginBottom: 16,
            fontSize: 14,
          }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 20,
            border: "1px solid #C0C0C0",
            marginBottom: 8,
            fontSize: 14,
          }}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 20,
            border: passwordsMatch ? "1px solid #C0C0C0" : "1px solid #FF4B4B",
            marginBottom: 15,
            fontSize: 14,
          }}
          required
        />
        {!passwordsMatch && form.confirmPassword && (
          <div style={{ color: "#FF4B4B", fontSize: 12, marginBottom: 8 }}>
            Passwords do not match!
          </div>
        )}
        {error && (
          <div style={{ color: "#FF4B4B", fontSize: 12, marginBottom: 8 }}>
            {error}
          </div>
        )}
        <Link to='/home'>
        <button
          type="submit"
          disabled={!passwordsMatch || !form.password}
          style={{
            width: "100%",
            padding: "10px",
            background: passwordsMatch && form.password ? "#C390B4" : "#888",
            color: "white",
            border: "none",
            borderRadius: 20,
            fontWeight: "bold",
            fontSize: 15,
            marginBottom: 16,
            boxShadow: "0px 3px 8px rgba(0,0,0,0.24)",
            cursor: passwordsMatch && form.password ? "pointer" : "not-allowed",
            opacity: passwordsMatch && form.password ? 1 : 0.7,
          }}
        >
          Sign Up
        </button></Link>
        <div style={{ textAlign: "center", fontSize: 10, color: "#F5EEEE", marginBottom: 8 }}>
          Already have an account?{" "}
          <span
            style={{
              color: "#FFBEEF",
              fontWeight: 900,
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={onAlreadyHaveAccount}
          >
            Log in
          </span>
        </div>
        <button
          type="button"
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
          Sign up with Apple
        </button>
        <button
          type="button"
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
          Sign up with Google
        </button>
      </form>
    </div>
  );
}

export default SignInBox;
