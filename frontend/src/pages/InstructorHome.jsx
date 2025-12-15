import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const InstructorHome = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  fetch("http://localhost:5200/api/courses", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then(res => res.json())
    .then(allCourses => {
      // ✅ filter courses taught by this instructor
      const instructorCourses = allCourses.filter(course =>
        course.instructorIds.includes(user._id)
      );
      setCourses(instructorCourses);
    })
    .catch(console.error);
}, []);


  return (
    <>
      <Navbar />

      <div className="instructor-container">
        <h2 className="instructor-title">Instructor Dashboard</h2>

        {/* ======================
            INSTRUCTOR COURSES
           ====================== */}
        {courses.map(course => (
          <div key={course._id} className="instructor-course-card">
            <h3>{course.title}</h3>
            <p>Course Code: {course.code}</p>

            <div className="course-actions">
              <button
                onClick={() =>
                  navigate("/instructor/create-thread", {
                    state: { courseId: course._id },
                  })
                }
              >
                Create Thread
              </button>

              <button
                onClick={() => navigate(`/threads/${course._id}`)}
              >
                View Threads
              </button>

      <button
  onClick={() =>
    navigate("/announcements", {
      state: { courseId: course._id },
    })
  }
>
  Post Announcement
</button>


              <button onClick={() => navigate(`/questions/course/${course._id}`)}>
  Answer Questions
</button>

            </div>
          </div>
        ))}

        {/* ======================
            GLOBAL MODERATION
           ====================== */}
        <div className="instructor-actions">
          <div className="instructor-card">
            <h3>Moderate Discussions</h3>
            <p>
              Review reported replies and manage discussions across all courses.
            </p>
            <button onClick={() => navigate("/reports")}>
              Moderate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorHome;
