import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SemesterCourses from "./SemesterCourses";
import { Button, FormInput, FormGroup, Form, FormField, Input } from 'semantic-ui-react'



const Courses = () => {
    const [Course, setCourse] = useState([]);
    const [CourseID, setID] = useState("");
    const [CourseName, setName] = useState("");
    const [CreditHrTh, setCreHrTh] = useState("");
    const [CreditHrLab, setCreHrLab] = useState("");
    const [ProgID, setProgID] = useState("");
    const [SemID, setSemID] = useState("");
    const [TeacherID, setTeacherID]= useState("");

    const [showCourses,setShowCourses]=useState(false)

  
   

// routing
    const navigate=useNavigate();

    // common courses
    const handleShowCommonCourses=()=>{
        setShowCourses(!showCourses);
    
      }

    // Fetch Courses from backend
    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/Admin/Course");
            setCourse(response.data);
            // console.log(setCourse(response.data));
        } catch (error) {
            console.error("Error fetching Courses:", error);
        }
    };

    // Add a course
    const addCourse = async () => {
        try {
            await axios.post("http://localhost:5500/api/Admin/Course", { CourseID,CourseName,CreditHrTh,CreditHrLab,ProgID,SemID,TeacherID },
                {
                    headers: {
                        'Content-Type': 'application/json'  // Set the header for JSON content
                    }
                }
            );
            fetchCourses(); // Refresh course list
            setID();
            setName("");
            setCreHrTh("");
            setCreHrLab("");
            setProgID("");
            setSemID("");
            setTeacherID("");
        } catch (error) {
            console.error("Error adding Course:", error);
        }
    };

    // Delete a Course
    const deleteCourse = async (CourseID) => {
        try {
            await axios.delete(`http://localhost:5500/api/Admin/Course/${CourseID}`);
            fetchCourses(); // Refresh user list
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // route to add programm
    const addProgHandler=()=>{
        navigate('/Admin/Program')
    }

    // route to add Student
    const addStudentHandler=()=>{
        navigate('/Admin/Student')
    }

    // route to add Semester
    const addSemHandler=()=>{
        navigate('/Admin/Semester')
    }
    // route to add Teacher
    const addTeacherHandler=()=>{
        navigate('/Admin/Teacher')
    }

    // Route to Home Page
    const homeHandler=()=>{
        navigate('/');
    }
   

    return (
        <div>
            <h1>Course Management</h1>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    addCourse();
                }}
            >
            <FormGroup>
                 <FormField required>
                    <label>Course ID</label>
                    <Input

                    type="number"
                    placeholder="CourseID"
                    value={CourseID}
                    onChange={(e) => setID(e.target.value)}
                    min={1}
                    required
                    
                    />
                 </FormField>
                <FormField required>
                    <label>Course Name</label>
                    <Input   
                    type="text"
                    placeholder="CourseName"
                    value={CourseName}
                    onChange={(e) => setName(e.target.value)}
                    width={10}
                    required
                    
                />
                </FormField>
                <FormField required>  
                    <label>Credit hr theory</label>

                <Input
                    type="Text"
                    placeholder="CreditHrTh"
                    value={CreditHrTh}
                    onChange={(e) => setCreHrTh(e.target.value)}
                    required
                    
                    />
                </FormField>
                <FormField required>
                    <label>Credit hr lab</label>
                <Input
                    type="Text"
                    placeholder="CreditHrLab"
                    value={CreditHrLab}
                    onChange={(e) => setCreHrLab(e.target.value)}
                    required
                    
                    />
                </FormField>
            </FormGroup>

            <FormGroup>
                <FormField required>
                    <label>Programm ID</label>
                <Input
                    type="Text"
                    placeholder="Program ID"
                    value={ProgID}
                    onChange={(e) => setProgID(e.target.value)}
                    required
                    />
                </FormField>
                <FormField required>
                    <label>Semester name</label>
                <Input
                    type="Text"
                    placeholder="Semester ID"
                    value={SemID}
                    onChange={(e) => setSemID(e.target.value)}
                    required
                    />
                </FormField>

                <FormField required>
                    <label>Teacher ID</label>
                <Input
                    type="text"
                    placeholder="Teacher ID"
                    value={TeacherID}
                    onChange={(e) => setTeacherID(e.target.value)}
                    required
                   
                    />
                </FormField>
                </FormGroup>
                <div>

                    <Button  type="submit" inverted color="green" >Add Course</Button>
                </div>

             
                
                
            </Form>

            <table>
                <thead>
                    <tr>
                        <th>CourseID</th>
                        <th>Course Name</th>
                        <th>Credit Hours Theory</th>
                        <th>Credit Hours Lab</th>
                        <th>Program ID</th>
                        <th>Semester ID</th>
                        <th>Teacher ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Course.map((Course) => (
                        <tr key={Course.CourseID}>
                            <td>{Course.CourseID}</td>
                            <td>{Course.CourseName}</td>
                            <td>{Course.CreditHrTh}</td>
                            <td>{Course.CreditHrLab}</td>
                            <td>{Course.ProgID}</td>
                            <td>{Course.SemID}</td>
                            <td>{Course.TeacherID}</td>
                            <td>
                                <Button inverted color="red" onClick={() => deleteCourse(Course.CourseID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button onClick={() => addProgHandler()}>Add Programm</button>
            </div>
            <div>
                <button onClick={() => addSemHandler()}>Add Semester</button>
            </div>
            <div>
                <button onClick={() => addStudentHandler()}>Add Student</button>
            </div>
            <div>
                <button onClick={() => addTeacherHandler()}>Add Teacher</button>
            </div>
            <div>
                <button onClick={() => homeHandler()}>Back to Login</button>
            </div>

            <div className='App'>
      <button onClick={handleShowCommonCourses}>
         {showCourses ?"Hide Courses":"Show Common Courses"}

      </button>
      {showCourses && <SemesterCourses />}
    
      
    </div>
           
        </div>
    );
};

export default Courses;
