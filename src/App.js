
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import MovieDetailPage from './pages/MovieDetailPage';

const App = () => {
  return (
    <Router>
      <div>
      
        <Routes>
      <Route path="/" element={<SearchPage />} />
       <Route path="/movie/:id" element={<MovieDetailPage />} />
       <Route path="/favorites" element={<FavoritesPage  />} />
     </Routes>
      </div>
    </Router>
  );
};

export default App;

