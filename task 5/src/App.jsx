import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import './App.css';

const About = lazy(() => import('./pages/About'));
const TitlesList = lazy(() => import('./pages/TitlesList'));
const TitleDetails = lazy(() => import('./pages/TitleDetails'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageFallback() {
  return <div className="page state" style={{ padding: '2rem' }}>Loading page…</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="titles" element={<TitlesList />} />
            <Route path="titles/:id" element={<TitleDetails />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;