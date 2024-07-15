import { useContext } from "react";
import { MovieType } from "../useMovies";
import { ThemeContext } from "./ThemeProvider";

export default function MovieList({
  movies,
  onSelectMovie,
}: {
  movies: MovieType[] | null;
  onSelectMovie: (a: string) => void;
}) {
  const theme = useContext(ThemeContext);
  return (
    <ul
      className={
        theme.theme === "dark"
          ? "list list-movies"
          : "list list-light list-movies-light"
      }
    >
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({
  movie,
  onSelectMovie,
}: {
  movie: MovieType;
  onSelectMovie: (value: string) => void;
}) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
