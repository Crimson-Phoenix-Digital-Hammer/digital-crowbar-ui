import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import Alternatives from './pages/Alternatives';
import RecentSearches from './pages/RecentSearches';
import ImgSearch from './pages/ImageSearch';
import UserSettings from './pages/Settings';
import AppTools from './pages/Tools';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/tools" element={<AppTools />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/alternatives" element={<Alternatives />} />
          <Route path="/recent-searches" element={<RecentSearches />} />
          <Route path="/image-search" element={<ImgSearch />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
