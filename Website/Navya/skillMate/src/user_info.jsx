import React, { useState } from "react";
import "./user_info.css";
import photo from "./photo.jpg";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: "Rahul",
    lastName: "Bhargav",
    gender: "Female",
    collegeId: "1234getonthedancefloor",
    github: "1234getonthedancefloor",
    phone: "1001001001",
    collegeName: "Physics Wallah",
    graduationYear: "2030",
    state: "in your heart ;)",
    city: "Right Atrium",
    techStack: Array(10).fill("Python"),
  });
  const [clickedTags, setClickedTags] = useState(
    Array(formData.techStack.length).fill(false)
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagClick = (index) => {
    setClickedTags((prev) => {
      const newClicked = [...prev];
      newClicked[index] = !newClicked[index]; // toggle true/false
      return newClicked;
    });
  };



  return (
    <div className="edit-profile-page">
      <header className="navbar">
        <h1>SKILL MATE</h1>
        <nav>
          <button className="your-team">YOUR TEAM</button>
          <div className="icons">
            <span className="icon-circle" />
            <span className="icon-circle" />
          </div>
        </nav>
      </header>

      <div className="profile-top">
        <img src={photo} alt="Profile" className="profile-pic" />
        <h2>Rahul Bhargav</h2>
        <button className="upload-btn">Upload Resume</button>
      </div>

      <form className="edit-form">
        <div className="form-grid">
          <div>
            <label>First Name</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div>
            <label>Last Name</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div>
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label>College ID</label>
            <input name="collegeId" value={formData.collegeId} onChange={handleChange} />
          </div>
          <div>
            <label>Github</label>
            <input name="github" value={formData.github} onChange={handleChange} />
          </div>
          <div>
            <label>Phone Number</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <label>College Name</label>
            <input name="collegeName" value={formData.collegeName} onChange={handleChange} />
          </div>
          <div>
            <label>Graduation Year</label>
            <input name="graduationYear" value={formData.graduationYear} onChange={handleChange} />
          </div>
          <div>
            <label>State</label>
            <input name="state" value={formData.state} onChange={handleChange} />
          </div>
          <div>
            <label>City</label>
            <input name="city" value={formData.city} onChange={handleChange} />
          </div>
        </div>

        <div className="tech-stack-section">
          <label>Tech Stack</label>
          <div className="tech-tags">
            {formData.techStack.map((tech, index) => (
              <span
                className={`tag ${clickedTags[index] ? "tag-clicked" : ""}`}
                key={index}
                onClick={() => handleTagClick(index)}
                style={{ cursor: "pointer" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <button className="save-btn" type="submit">save</button>
      </form>
    </div>
  );
}
