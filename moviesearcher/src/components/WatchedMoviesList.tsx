import { useContext } from "react";
import { WatchedMovieData } from "./MovieDetails";
import { ThemeContext } from "./ThemeProvider";

export function WatchedMoviesList({
  watched,
  onDeleteWatched,
  onSelectMovie,
}: {
  watched: WatchedMovieData[];
  onDeleteWatched: (value: string) => void;
  onSelectMovie: (value: string) => void;
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
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({
  movie,
  onDeleteWatched,
  onSelectMovie,
}: {
  movie: WatchedMovieData;
  onDeleteWatched: (value: string) => void;
  onSelectMovie: (value: string) => void;
}) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.RuntimeMinutes} min</span>
        </p>
        <p>
          <span>📅</span>
          <span>{movie.date}</span>
        </p>
        <p>
          <button
            className="btn-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteWatched(movie.imdbID);
            }}
          >
            X
          </button>
        </p>
      </div>
    </li>
  );
}
