import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { useNavigate } from "react-router-dom";


const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
 
   const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
        
      }
    };

    fetchMovie();
  }, [id]);

  

  if (error) return <p className="text-red-500">{error}</p>;
  
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4 bg-orange-200">
      <div className="flex flex-col md:flex-row">
        {movie.Poster !== 'N/A' &&<img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full md:w-1/3 h-auto rounded-lg shadow-lg mb-4 md:mb-0"
        />}
        <div className="md:ml-4">
          <h1 className="text-2xl font-bold ">{movie.Title}</h1>
          <p className="text-black pt-4"><strong>Released:</strong> {movie.Year}</p>
          <p className="text-black pt-4"><strong>Genre:</strong> {movie.Genre}</p>
          <p className="text-black pt-4"><strong>Plot:</strong> {movie.Plot}</p>
          <p className="text-black pt-4"><strong>Cast:</strong> {movie.Actors}</p>
          <p className="text-black pt-4"><strong>Ratings:</strong> {movie.imdbRating}</p>

          
          <div className="w-full mt-5 "> 
                   

                   <button
                       onClick={() => navigate(-1)} className="py-2 px-4 bg-green-500 text-white rounded-lg text-lg" >
                       Go to Main page
                   </button>
               

           </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;



