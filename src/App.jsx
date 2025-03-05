import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ManageFlipbooks from './pages/ManageFlipbooks';
import CreateFlipbook from './pages/CreateFlipbook';
import EditFlipbook from './pages/EditFlipbook';
import ViewFlipbook from './pages/ViewFlipbook';

function App() {
  return (
<>
<Router>
      <Routes>
        <Route path="/" element={<Navigate to="/manage" />} />
        <Route path="/manage" element={<ManageFlipbooks />} />
        <Route path="/create" element={<CreateFlipbook />} />
        <Route path="/edit/:id" element={<EditFlipbook />} />
        <Route path="/view/:id" element={<ViewFlipbook />} />
      </Routes>
    </Router>
    

    <div class="marquee-container">
        <div class="marquee-content">RTN GLOBAL LLC</div>
    </div>
</>
  );
}

export default App;
