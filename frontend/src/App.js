import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Threads from "./pages/Threads";
import Questions from "./pages/Questions";

import InstructorHome from "./pages/InstructorHome";
import CreateThread from "./pages/CreateThread";
import InstructorQuestions from "./pages/InstructorQuestions";

import Announcements from "./pages/Announcements";
import Reports from "./pages/Reports";
import AdminHome from "./pages/AdminHome"; // ✅ ADMIN PAGE

function App() {
    return ( <
        BrowserRouter >
        <
        Routes > { /* ================= AUTH ================= */ } <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/register"
        element = { < Register / > }
        />

        { /* ================= STUDENT ================= */ } <
        Route path = "/"
        element = { < Home / > }
        /> <
        Route path = "/home"
        element = { < Home / > }
        />

        { /* ================= THREADS & QUESTIONS ================= */ } <
        Route path = "/threads/:courseId"
        element = { < Threads / > }
        /> <
        Route path = "/threads"
        element = { < Threads / > }
        /> <
        Route path = "/questions/:threadId"
        element = { < Questions / > }
        /> <
        Route path = "/questions"
        element = { < Questions / > }
        />

        { /* ================= INSTRUCTOR ================= */ } <
        Route path = "/instructor/home"
        element = { < InstructorHome / > }
        /> <
        Route path = "/instructor/create-thread"
        element = { < CreateThread / > }
        /> <
        Route path = "/questions/course/:courseId"
        element = { < InstructorQuestions / > }
        />

        { /* ================= ANNOUNCEMENTS ================= */ } <
        Route path = "/announcements"
        element = { < Announcements / > }
        />

        { /* ================= REPORTS ================= */ } <
        Route path = "/reports"
        element = { < Reports / > }
        />

        { /* ================= ADMIN ================= */ } <
        Route path = "/admin/dashboard"
        element = { < AdminHome / > }
        />

        { /* ================= FALLBACK ================= */ } <
        Route path = "*"
        element = { < Navigate to = "/login"
            replace / > }
        /> <
        /Routes> <
        /BrowserRouter>
    );
}

export default App;