import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Layout from './components/Layout';
import NotFound from './components/NotFound';

// auth screens
import Login from './views/Auth/Login';
import Register from './views/Auth/Signup';

// private screens
import Home from './views/Home/Home';
import ProjectDetail from './views/Home/ProjectDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" index element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;