import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(() => {
    setIsLoading(true);
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedMovies = data.results.map((movie) => {
          return {
            id: movie.episode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            releaseDate: movie.release_date,
          };
        });

        setMovies(transformedMovies);
        setIsLoading(false);
      });
  }, []);

  async function fetchMoviesHandlerAsync() {
    setIsLoading(true);
    setError(null);
    const response = await fetch("https://swapi.dev/api/films");
    if (response.ok === false) {
      setError(true);
      setIsLoading(false);
      return;
    }
    const data = await response.json();

    const transformedMovies = data.results.map((movie) => {
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      };
    });

    setMovies(transformedMovies);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {error && <p>Something has gone wrong !!</p>}
        {movies.length > 0 && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
        {!error && !isLoading && movies.length < 1 && <p>No movies found !!</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
