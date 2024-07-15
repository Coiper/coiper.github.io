import { WatchedMovieData } from "./MovieDetails";

export function WatchedMovie({
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
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
