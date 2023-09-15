import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import Alternatives from './pages/Alternatives';
import RecentSearches from './pages/RecentSearches';
import ImgSearch from './pages/ImageSearch';
import AppTools from './pages/Tools';
import GenerateImg from './components/GenerateImg';
import Stats from './components/Stats';
import Faqs from './components/Faqs';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/tools" element={<AppTools />} />
          <Route path="/updates-and-faq" element={<Faqs />} />
          <Route path="/text-search" element={<Alternatives />} />
          <Route path="/recent-searches" element={<RecentSearches />} />
          <Route path="/image-search" element={<ImgSearch />} />
          <Route path="/image-search/generate-image" element={<GenerateImg />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
