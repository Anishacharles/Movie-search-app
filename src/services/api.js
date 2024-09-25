
const API_KEY = 'a365e00';
export const searchMovies = async (query, page = 1, genre = '') => {
  const url = `https://www.omdbapi.com/?s=${query}&type=movie&page=${page}&apikey=${API_KEY}${genre ? `&genre=${genre}` : ''}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      return data; // Return the movie data if successful
    } else {
      throw new Error(data.Error); // Handle API errors
    }
  } catch (error) {
    throw error; // Re-throw the error to be handled elsewhere
  }
};

export const getMovieDetails = async (id) => {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data; // Return the movie details
  } catch (error) {
    throw error; // Handle errors
  }
};
