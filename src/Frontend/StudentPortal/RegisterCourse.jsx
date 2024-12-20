import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [StudentID, setStudentID] = useState("");
  // const [StuCourseID, setStuCourseID]= useState("");
  const [message, setMessage] = useState("");

  // navigate too View Courses
  const navigate =useNavigate();

  const handleViewCourses=()=>{
    navigate("/Student/viewCourses");
  }

  // naviagate to home page
  const handlerBackHome=()=>{
    navigate('/');
  }

  // Fetch available courses
  const fetchAvailableCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/Student/RegisterCourses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setMessage("Error fetching courses. Please try again later.");
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    fetchAvailableCourses();
  }, []);

  // Handle course selection
  const handleCourseSelection = (courseID) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courseID)
        ? prevSelected.filter((id) => id !== courseID) // Deselect if already selected
        : [...prevSelected, courseID] // Add to selected
    );
  };

  // Handle course registration
  const handleRegistration = async () => {
    if (!StudentID ) {
      setMessage("Please provide a valid Student ID ");
      return;
    }
    else if(selectedCourses.length === 0){
      setMessage(" select at least one course.");
    }

    const payload = {
       
      StudentID: StudentID,
      CourseID: selectedCourses,
    };

    try {
      const response = await axios.post("http://localhost:5500/api/Student/RegisterCourses", payload);
      setMessage(response.data.message || "Registered successfully!");
      setSelectedCourses([]); // Clear selected courses after successful registration
    } catch (error) {
      console.error("Error registering courses:", error);
      setMessage(`Error: ${error.response?.data?.message || "An error occurred."}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Course Registration</h1>
      
      {/* Student ID Input */}
      <div>
        <label>Student ID:</label>
        <input
          type="text"
          value={StudentID}
          onChange={(e) => setStudentID(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </div>
     

      {/* Courses List */}
      <h2>Available Courses</h2>
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.CourseID}>
            <input
              type="checkbox"
              checked={selectedCourses.includes(course.CourseID)}
              onChange={() => handleCourseSelection(course.CourseID)}
            />
            <label style={{ marginLeft: "8px" }}>{course.CourseName}</label>
          </div>
        ))
      ) : (
        <p>Loading courses...</p>
      )}

      {/* Register Button */}
      <button
        onClick={handleRegistration}
        style={{ marginTop: "20px", padding: "10px", backgroundColor: "#4CAF50", color: "white" }}
      >
        Register
      </button>

      {/* Message */}
      {message && <p style={{ marginTop: "20px", color: "blue" }}>{message}</p>}

      <div>
        <button onClick={handleViewCourses}>View Registerd Courses</button>
      </div>
      <div>
        <button onClick={handlerBackHome}>Back to Login</button>
      </div>
    </div>
  );
};

export default RegisterCourse;
