
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Semester = () => {
    const [Semester, setSemester] = useState([]);
    const [SemesterID, setID] = useState("");
    const [SemesterName, setName] = useState("");
    const [loading, setLoading] = useState(true)
  const [error, setError] = useState("");

  const navigate=useNavigate();

  const handleAddCourse = () => {
    navigate('/Admin/Courses');
  }  

    // Fetch Semester from backend
    const fetchSemester = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/Admin/Semesters");
            // console.log(response);
            setSemester(response.data);
            setLoading(false)
            // console.log(setSemester(response.data));
        } catch (error) {
            console.error("Error fetching Semester:", error);
            setError("Error fetching Semester".error);
            setLoading(false)
        }
    };

    // Add a semester
    const addSemester = async () => {
        try {
            const recive=await axios.post("http://localhost:5500/api/Admin/Semesters", 
                { SemesterID, SemesterName },  // Send the data as JSON
                {
                    headers: {
                        'Content-Type': 'application/json'  // Set the header for JSON content
                    }
                }
            );
            console.log(recive);
            fetchSemester(); // Refresh Semester list
            setID();
            setName("");  // Clear the form fields after adding
        } catch (error) {
            console.error("Error adding Semester:", error);
        }
    };
    

    // Delete a Course
    const deleteSemester = async (CourseID) => {
        try {
            await axios.delete(`http://localhost:5500/api/Admin/Semesters/${CourseID}`);
            fetchSemester(); // Refresh user list
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        fetchSemester();
    }, []);

    return (
        <div>
            <h1>Semester Management</h1>
            {loading && <p>Loading courses...</p>}

            {error && <p style={{ color: "red" }}>{error}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addSemester();
                    // setLoading(false)
                }}
                >
                <input
                    type="number"
                    placeholder="SemesterID"
                    value={SemesterID}
                    onChange={(e) => setID(e.target.value)}
                    min={1}
                    required
                    />
                <input
                    type="text"
                    placeholder="Semester Name"
                    value={SemesterName}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
              
                <button type="submit">Add Semester</button>
            </form>
                    {!loading && !error && (

            <table>
                <thead>
                    <tr>
                        <th>Semester ID</th>
                        <th>Semester Name</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {Semester.map((Semester) => (
                        <tr key={Semester.SemesterID}>
                            <td>{Semester.SemesterID}</td>
                            <td>{Semester.SemesterName}</td>
                           
                            <td>
                                <button onClick={()=>{
                                    deleteSemester(Semester.SemesterID);
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}

            <div>
                <button onClick={handleAddCourse}>Add courses</button>
            </div>
        </div>
    );
};

export default Semester;

