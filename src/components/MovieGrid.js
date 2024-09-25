
import { Link } from 'react-router-dom';

const MovieGrid = ({ movies, toggleFavorite, favorites }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="bg-white shadow-md rounded-lg gray">
          <Link to={`/movie/${movie.imdbID}`}>
            <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{movie.Title}</h2>
              <p className="text-gray-600">{movie.Year}</p>
            </div>
          </Link>
          <button
            onClick={() => toggleFavorite(movie)}
            className={`mt-2 px-4 py-2 rounded ${favorites.includes(movie.imdbID) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >

            <i className={`fas ${favorites.includes(movie.imdbID) ? 'fa-heart' : 'fa-heart-broken'}`} />
          </button>


        </div>

      ))}
    </div>
  );
};

export default MovieGrid;



