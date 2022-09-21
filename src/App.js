import { React, useEffect, useState } from "react";
import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from './search.svg';

const apiKey = 'api key goes here';

const API_URL = `http://www.omdbapi.com?apikey=${apiKey}`;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('')
    }, []);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleClick = () => {
        searchMovies(searchTerm);
    }

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={handleClick}
                />
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>Search for a movie</h2>
                </div>
            )}

        </div>
    );
}

export default App;
