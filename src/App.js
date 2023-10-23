import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SearchResults from './pages/TextSearch/SearchResults';
import Alternatives from './pages/TextSearch/TextSearch';
import ImgSearch from './pages/ImageSearch/ImageSearch';
import Stats from './pages/Stats/Stats';
import Faqs from './pages/Updates/Faqs';
import Personas from './pages/Personas/Personas';

function App() {
  const routes = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/search',
      element: <SearchResults />,
    },
    {
      path: '/text-search',
      element: <Alternatives />,
    },
    {
      path: '/image-search',
      element: <ImgSearch />,
    },
    {
      path: '/stats',
      element: <Stats />,
    },
    {
      path: '/updates-and-faq',
      element: <Faqs />,
    },
    {
      path: '/personas',
      element: <Personas />,
    },
  ];
  
  return (
    
    <div className="app">
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
