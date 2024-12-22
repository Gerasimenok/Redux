import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Notes from "./routes/Notes";
import CreateNote from "./routes/CreateNote";
import EditNote from "./routes/EditNote";
import NoteView from "./routes/NoteView";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Register from "./routes/Register";
import RequireAuth from "./components/RequireAuth";
import UserContextProvider from "./components/UserContextProvider";
import NoteContextProvider from "./components/NoteContextProvider";

const App = () => {
  return (
    <Router>
      <UserContextProvider>
        <NoteContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/notes"
              element={
                <RequireAuth>
                  <Notes />
                </RequireAuth>
              }
            />
            <Route
              path="/create"
              element={
                <RequireAuth>
                  <CreateNote />
                </RequireAuth>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <RequireAuth>
                  <EditNote />
                </RequireAuth>
              }
            />
            <Route
              path="/note/:id"
              element={
                <RequireAuth>
                  <NoteView />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NoteContextProvider>
      </UserContextProvider>
    </Router>
  );
};

export default App;
