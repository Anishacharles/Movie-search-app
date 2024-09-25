import React from "react";
const SearchBar = ({ query, setQuery, handleSearch, genre, setGenre }) => {

    return (

        <div className="flex items-centre mb-4 max-w-md mx-auto mt-10">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies"
                className="flex-grow p-2 border rounded"
            />

            <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="ml-2 p-2 border rounded"
            >

                <option value="">All Genres</option>
                <option value="action">Action</option>
                <option value="drama">Drama</option>
                <option value="comedy">Comedy</option>
                <option value="series">Series</option>

            </select>


            <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">
                Search
            </button>

        </div>

    )
}

export default SearchBar


