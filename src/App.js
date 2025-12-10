import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InsertForm from "./components/InsertForm";
import UpdateForm from "./components/UpdateForm";
import DeleteForm from "./components/DeleteForm";
import DisplayForm from "./components/DisplayForm";
import Navbar from "./components/Navbar";
import { useState } from "react";
import "./App.css";

const collections = {
  users: ["_id", "name", "email", "role", "institutionId", "displayName", "avatarUrl", "passwordHash", "createdAt", "updatedAt", "status"],
  institutions: ["_id", "name", "location", "contact", "createdAt", "updatedAt", "status"],
  courses: ["_id", "title", "code", "description", "instructorIds", "term", "createdAt", "updatedAt", "status"],
  course_enrollments: ["_id", "userId", "courseId", "enrolledAt", "role", "status"],
  threads: ["_id", "courseId", "title", "creatorId", "tags", "pinned", "lastActivityAt", "createdAt", "updatedAt", "status"],
  questions: ["_id", "threadId", "courseId", "authorId", "content", "tags", "bestAnswerId", "createdAt", "updatedAt", "status"],
  replies: ["_id", "questionId", "threadId", "authorId", "content", "upvotes", "isBest", "createdAt", "updatedAt", "status"],
  posts: ["_id", "courseId", "userId", "title", "content", "attachments", "createdAt", "updatedAt", "status"],
  comments: ["_id", "postId", "authorId", "content", "createdAt", "updatedAt", "status"],
  tags: ["_id", "name", "parentTagId", "aliases", "createdAt", "updatedAt"],
  votes: ["_id", "userId", "targetId", "targetType", "voteType", "createdAt", "updatedAt"],
  notifications: ["_id", "userId", "type", "payload", "read", "createdAt", "updatedAt"],
  activity_logs: ["_id", "userId", "actionType", "targetId", "detail", "createdAt", "updatedAt"],
  attachments: ["_id", "ownerId", "filename", "url", "mime", "size", "createdAt", "updatedAt"],
  thread_subscriptions: ["_id", "userId", "threadId", "createdAt", "updatedAt", "status"],
  reports: ["_id", "reporterId", "targetId", "targetType", "reason", "status", "createdAt", "updatedAt"],
};

function App() {
  const [selectedCollection, setSelectedCollection] = useState("users");
  const [data, setData] = useState({});

  return (
    <Router>
      <Navbar selectedCollection={selectedCollection} setSelectedCollection={setSelectedCollection} collections={Object.keys(collections)} />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Navigate to="/insert" />} />
          <Route path="/insert" element={<InsertForm collection={selectedCollection} attributes={collections[selectedCollection]} data={data} setData={setData} />} />
          <Route path="/update" element={<UpdateForm collection={selectedCollection} attributes={collections[selectedCollection]} data={data} setData={setData} />} />
          <Route path="/delete" element={<DeleteForm collection={selectedCollection} data={data} setData={setData} />} />
          <Route path="/display" element={<DisplayForm collection={selectedCollection} attributes={collections[selectedCollection]} data={data} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
