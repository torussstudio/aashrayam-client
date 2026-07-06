import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/shared/ProtectedRoute';
import ScrollToTop from "./ScrollToTop";

// Layout
import Navbar from './components/frontend/Navbar';
import Footer from './components/frontend/Footer';

// Frontend pages
import Home          from './pages/frontend/Home';
import NewsListing   from './pages/frontend/NewsListing';
import NewsDetail    from './pages/frontend/NewsDetail';
import GalleryFull   from './pages/frontend/GalleryFull';
import EventsListing from './pages/frontend/EventsListing';

// New inner pages
import WhyAashrayam from './components/frontend/WhyAashrayam';
import Academics    from './components/frontend/Academics';
import Admissions   from './components/frontend/Admissions';
import StudentLife  from './components/frontend/StudentLife';
import Outcomes     from './components/frontend/Outcomes';
import ResourcesPage from './pages/frontend/Resources';
import Contact      from './components/frontend/Contact';

// Admin pages
import AdminLogin     from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import {
  AdminNews,
  AdminEvents,
  AdminPrograms,
  AdminGallery,
  AdminTestimonials,
  AdminResources,
} from './pages/admin/AdminCrudPages';
// Global styles
import './styles/global.css';

const FrontendLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const ScrollToHash = () => {
  const location = useLocation();

useEffect(() => {
  if (!location.hash) return;
  const id = location.hash.replace('#', '');
  // Wait for page to render before scrolling
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}, [location]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToHash />
        <ScrollToTop />
        <Routes>

          {/* ── Frontend ── */}
          <Route path="/"             element={<FrontendLayout><Home /></FrontendLayout>} />
          <Route path="/news"         element={<FrontendLayout><NewsListing /></FrontendLayout>} />
          <Route path="/news/:id"     element={<FrontendLayout><NewsDetail /></FrontendLayout>} />
          <Route path="/gallery"      element={<FrontendLayout><GalleryFull /></FrontendLayout>} />
          <Route path="/events"       element={<FrontendLayout><EventsListing /></FrontendLayout>} />

          {/* ── Inner pages ── */}
          <Route path="/why-aashrayam" element={<FrontendLayout><WhyAashrayam /></FrontendLayout>} />
          <Route path="/academics"     element={<FrontendLayout><Academics /></FrontendLayout>} />
          <Route path="/admissions"    element={<FrontendLayout><Admissions /></FrontendLayout>} />
          <Route path="/student-life"  element={<FrontendLayout><StudentLife /></FrontendLayout>} />
          <Route path="/outcomes"      element={<FrontendLayout><Outcomes /></FrontendLayout>} />
          <Route path="/resources"     element={<FrontendLayout><ResourcesPage /></FrontendLayout>} />
          <Route path="/contact"       element={<FrontendLayout><Contact /></FrontendLayout>} />

          {/* ── Admin ── */}
          <Route path="/admin/login"         element={<AdminLogin />} />
          <Route path="/admin"               element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard"     element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/news"          element={<ProtectedRoute><AdminNews /></ProtectedRoute>} />
          <Route path="/admin/events"        element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
          <Route path="/admin/programs"      element={<ProtectedRoute><AdminPrograms /></ProtectedRoute>} />
          <Route path="/admin/gallery"       element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
          <Route path="/admin/testimonials"  element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
          <Route path="/admin/resources"      element={<ProtectedRoute><AdminResources /></ProtectedRoute>} />

          {/* ── Catch all ── */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
