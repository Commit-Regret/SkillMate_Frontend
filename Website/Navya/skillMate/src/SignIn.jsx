import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: 20,
  border: "1px solid #C0C0C0",
  marginBottom: 16,
  fontSize: 14,
};


function SignInBox({ onClose, onAlreadyHaveAccount }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("Sign up successful!");
        navigate("/home");
      } else {
        const errJson = await res.json();
        setError(errJson.message || "Sign up failed. Try again.");
      }
    } catch (err) {
      setError(err.message || "Sign up failed. Try again.");
    }
  };

  const passwordsMatch = form.password === form.confirmPassword;

  return (
    <div style={{
        width: 400,
        padding: 32,
        background: "black",
        borderRadius: 10,
        boxShadow: "0px 5px 15px rgba(0,0,0,0.35)",
        color: "#EFEFEF",
        position: "relative",
        margin: "40px auto",
      }}>
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
      ></button>
       <h2
        style={{
          textAlign: "center",
          fontWeight: 900,
          fontSize: 28,
          marginBottom: 24,
        }}
      >
        Sign Up
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Name"
          value={form.username}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          style={{
            ...inputStyle,
            border: passwordsMatch ? "1px solid #C0C0C0" : "1px solid #FF4B4B",
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
        <button
          type="submit"
          disabled={!passwordsMatch || !form.password}
          style={{
            width: "100%",
            padding: "10px",
            background:
              passwordsMatch && form.password ? "#C390B4" : "#888",
            color: "white",
            border: "none",
            borderRadius: 20,
            fontWeight: "bold",
            fontSize: 15,
            marginBottom: 16,
            boxShadow: "0px 3px 8px rgba(0,0,0,0.24)",
            cursor:
            passwordsMatch && form.password ? "pointer" : "not-allowed",
            opacity: passwordsMatch && form.password ? 1 : 0.7,
          }}
        >
          Sign Up
        </button>
        <div
          style={{
            textAlign: "center",
            fontSize: 10,
            color: "#F5EEEE",
            marginBottom: 8,
          }}
        >
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
      </form>
    </div>
  );
}

export default SignInBox;

