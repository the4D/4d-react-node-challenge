import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FormPage from './pages/FormPage';
import ResultsPage from './pages/ResultsPage';
import { Navigation } from './components/common/Navigation';
import FormDataGenerator from './pages/DownloadData';

export const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/downloadData" element={<FormDataGenerator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};
