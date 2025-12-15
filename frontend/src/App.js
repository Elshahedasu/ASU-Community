import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Threads from "./pages/Threads";
import Questions from "./pages/Questions";
import Register from "./pages/Register";
import InstructorHome from "./pages/InstructorHome"; // ✅ ADD THIS
import CreateThread from "./pages/CreateThread"; // NEW IMPORT  
import Reports from "./pages/Reports";
import Announcements from "./pages/Announcements";
import InstructorQuestions from "./pages/InstructorQuestions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* STUDENT / GENERAL HOME */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* INSTRUCTOR HOME ✅ */}
        <Route path="/instructor/home" element={<InstructorHome />} />

        {/* THREADS & QUESTIONS */}
        <Route path="/threads/:courseId" element={<Threads />} />
        <Route path="/questions/:threadId" element={<Questions />} />
        <Route path="/threads" element={<Threads />} />
 
        {/* CREATE THREAD */}
        <Route path="/instructor/create-thread" element={<CreateThread />} />
        
        {/* REPORTS */}
        <Route path="/reports" element={<Reports />} />

        {/* QUESTIONS */}
        <Route path="/questions" element={<Questions />} />
        
        {/* ANNOUNCEMENTS */}
        <Route path="/announcements" element={<Announcements />} />
        
          {/* INSTRUCTOR QUESTIONS VIEW */}
<        Route path="/questions/course/:courseId" element={<InstructorQuestions />}
/>


  
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
