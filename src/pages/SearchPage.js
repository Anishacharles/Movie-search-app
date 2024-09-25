import React, { useState, useEffect,useCallback } from 'react';
import { searchMovies } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';


const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0); 
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState(''); 
  const [hasMore, setHasMore] = useState(true); 
  
   // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    setFavoritesCount(storedFavorites.length); // Set initial favorites count
  }, []);


   // Save favorites to localStorage when favorites state changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setFavoritesCount(favorites.length); // Update favorites count
  }, [favorites]);

  useEffect(() => {
    // Fetch default movies when the component mounts
    const fetchDefaultMovies = async () => {
      const defaultMovieTitles = ['Inception', 'The Dark Knight', 'Interstellar', 'Titanic', 'Avengers: Endgame','The Godfather',
        'The Lord of the Rings: The Return of the King','The Matrix'];
      const defaultMovies = [];

      for (const title of defaultMovieTitles) {
        const response = await searchMovies(title);
        if (response.Response === 'True') {
          defaultMovies.push(response.Search[0]);
        }
      }

      setMovies(defaultMovies);
    };

    fetchDefaultMovies();
  }, []);

  const handleSearch = useCallback(async () => {
    if (!query) return; // Prevent search if query is empty
    try {
      const result = await searchMovies(query, page, genre); 
      if (result.Response === 'True') {
        setMovies(result.Search);
        setHasMore(result.Search.length > 0); 
        setError(null);
      } else {
        setMovies([]);
        setError(result.Error);
        setHasMore(false); // No more results if the search fails
      }
    } catch (err) {
      setError(err.message);
      setHasMore(false); // No more results on error
    }
  } ,[page, query, genre]);

  // Toggle favorites function
  const toggleFavorite = (movie) => {
    const isFavorite = favorites.includes(movie.imdbID);
    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter((id) => id !== movie.imdbID);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, movie.imdbID];
    }

    // Update state and localStorage
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [page, query, genre,handleSearch]); 

  return (
   <div className='bg-emerald-200'>
    <nav className="flex justify-between items-center bg-gray-800 p-4">
        <Link to="/" className="text-xl font-bold text-white"><i className="fa-solid fa-film text-white"></i>Movies</Link>
         <Link to="/favorites" className="text-xl font-bold text-white"><i className="fa-solid fa-heart text-red-500"></i>
         Favorites:{favorites.length}</Link>
        </nav>
      <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} genre={genre} setGenre={setGenre}/>
      
      {error && <p className="text-red-500">{error}</p>}
      <MovieGrid movies={movies} toggleFavorite={toggleFavorite} favorites={favorites} />
      <Pagination page={page} setPage={setPage} hasMore={hasMore} /> 
    </div>
  );
};

export default SearchPage;



