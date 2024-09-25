import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../services/api';
import { useNavigate } from "react-router-dom";
const FavoritesPage = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];


        // Fetch details for each favorite movie
        const fetchFavorites = async () => {
            const movies = await Promise.all(
                favoriteIds.map(async (id) => {
                    const movie = await getMovieDetails(id);
                    return movie;
                })
            );
            setFavoriteMovies(movies);
        };

        fetchFavorites();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className='text-red-800 font-mono ...'>Your Favorite Movies</h1>
            <div className="grid grid-cols-4 gap-4">

                {favoriteMovies.length > 0 ? (
                    favoriteMovies.map((movie) => (
                        <div key={movie.imdbID} className="border p-4">

                            <img src={movie.Poster} alt={movie.Title} className="w-full h-60 object-cover" />
                            <h3>{movie.Title}</h3>
                            <p>{movie.Year}</p>
                            <p>{movie.Genre}</p>

                        </div>
                    ))
                ) : (
                    <p className='text-red-500'>No favorite movies added yet.</p>
                )}



            </div>
            <div className="w-full mt-5 ">


                <button
                    onClick={() => navigate(-1)} className="py-2 px-4 bg-green-500 text-white rounded-lg text-lg " >
                    Go to Main page
                </button>


            </div>
        </div>
    );
};

export default FavoritesPage;


