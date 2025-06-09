import React, { useState } from 'react';
import photo from "./photo.jpg";
import { LogOut, User } from 'lucide-react';

export default function UserProfileForm() {
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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagClick = (index) => {
    setClickedTags((prev) => {
      const newClicked = [...prev];
      newClicked[index] = !newClicked[index];
      return newClicked;
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // You can process or upload the file here
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="w-screen min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-[#90A8C3] via-[#ADA7C9] to-[#F4CAE0] px-6 py-4 flex justify-between items-center shadow-md">
         <div className="font-bold text-xl text-black">SKILL MATE</div>
          <div className="flex items-center gap-4">
        <button className="bg-black text-white px-4 py-2 rounded-full font-medium">YOUR TEAM</button>
        <div className="bg-black p-2 rounded-full flex items-center justify-center">
        <User className="text-white w-5 h-5" />
        </div>
      <div className="bg-black p-2 rounded-full flex items-center justify-center">
          <LogOut className="text-white w-5 h-5" />
      </div>
      </div>
      </nav>


      {/* Profile Top */}
      <div className="flex flex-wrap items-center gap-5 px-6 py-5 border-b border-gray-500 bg-gray-300 text-black">
        <img src={photo} alt="Profile" className="w-[90px] h-[90px] rounded-full object-cover" />
        <h2 className="text-xl font-semibold">Rahul Bhargav</h2>
        {/* Tailwind-styled Upload Resume */}
        <div className="ml-auto flex flex-col items-start gap-3">
          <button
            type="button"
            className="bg-gray-700 text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-gray-900 transition-colors"
            onClick={handleUploadClick}
          >
            Upload Resume
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          {selectedFile && (
            <p className="text-sm text-gray-700 mt-1">
              Selected file: <span className="font-semibold">{selectedFile.name}</span>
            </p>
          )}
        </div>
      </div>

      {/* Form */}
      <form className="px-8 py-6 text-black">
        <div className="grid grid-cols-2 gap-6 max-[1024px]:grid-cols-1">
          {[
            ["First Name", "firstName"],
            ["Last Name", "lastName"],
            ["Gender", "gender"],
            ["College ID", "collegeId"],
            ["Github", "github"],
            ["Phone Number", "phone"],
            ["College Name", "collegeName"],
            ["Graduation Year", "graduationYear"],
            ["State", "state"],
            ["City", "city"],
          ].map(([label, name], idx) => (
            <div key={idx}>
              <label className="block font-bold mb-1">{label}</label>
              {name === "gender" ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-600 text-white border border-gray-300"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <input
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-600 text-white border border-gray-300"
                />
              )}
            </div>
          ))}
        </div>

        {/* Tech Tags */}
        <div className="mt-8">
          <label className="block font-bold mb-2">Tech Stack</label>
          <div className="flex flex-wrap gap-3">
            {formData.techStack.map((tech, index) => (
              <span
                key={index}
                onClick={() => handleTagClick(index)}
                className={`cursor-pointer px-4 py-1.5 rounded-full transition-colors duration-300 select-none ${
                  clickedTags[index] ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="mt-6 px-6 py-2 bg-gray-700 text-white rounded-lg">
          save
        </button>
      </form>
    </div>
  );
}
