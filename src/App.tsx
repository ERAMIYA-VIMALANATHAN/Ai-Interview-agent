import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CareerGuidance from './pages/CareerGuidance';
import Roadmap from './pages/Roadmap';
import CompanyIntel from './pages/CompanyIntel';
import MockInterview from './pages/MockInterview';
import LearningHub from './pages/LearningHub';
import FocusAssistant from './pages/FocusAssistant';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/career" element={<CareerGuidance />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/company-intel" element={<CompanyIntel />} />
          <Route path="/interview" element={<MockInterview />} />
          <Route path="/learn" element={<LearningHub />} />
          <Route path="/focus" element={<FocusAssistant />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
