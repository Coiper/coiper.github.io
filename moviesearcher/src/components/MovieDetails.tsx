import { useContext, useEffect, useState } from "react";
import { Loader, KEY } from "../App";
import { useKey } from "../useKey";
import StarRating from "../StarRating";
import { ThemeContext } from "./ThemeProvider";

interface PropsMovieDetails {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (value: WatchedMovieData) => void;
  watched: WatchedMovieData[];
}

export interface WatchedMovieData {
  imdbID: string;
  Title: string;
  Year: number;
  Poster: string;
  imdbRating: number;
  Runtime?: string;
  RuntimeMinutes: number;
  userRating: number;
  date: string;
}

interface MovieData {
  imdbID: string;
  Title: string;
  Year: number;
  Poster: string;
  Runtime: string;
  RuntimeMinutes: number;
  imdbRating: number;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
}

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: PropsMovieDetails) {
  const theme = useContext(ThemeContext);
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [userRating, setUserRating] = useState<number>(0);

  const watchedMovie = watched.find((movie) => movie.imdbID === selectedId);
  const isWatched = watchedMovie != null;
  const watchedUserRating = watchedMovie?.userRating;
  const dateWatched = watchedMovie?.date;

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        setMovie(null);
        const res = await fetch(
          `https://www.omdbapi.com?apikey=${KEY}&i=${selectedId}`
        );
        const data: MovieData = await res.json();
        data.imdbRating = Number(data.imdbRating);
        data.RuntimeMinutes = Number(data.Runtime?.split(" ")[0]);
        setMovie(data);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  function handleAdd() {
    if (movie != null) {
      console.log("handleAdd", movie);
      const newWatchedMovie: WatchedMovieData = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        imdbRating: movie.imdbRating,
        RuntimeMinutes: movie.RuntimeMinutes,
        userRating,
        date: new Intl.DateTimeFormat("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date()),
      };
      onAddWatched(newWatchedMovie);
      onCloseMovie();
    }
  }

  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  useEffect(
    function () {
      if (!movie?.Title) return;
      document.title = `Movie | ${movie.Title}`;

      return function () {
        document.title = "Coiper's Movie Searcher";
      };
    },
    [movie?.Title]
  );

  return (
    <div className="details">
      {movie === null ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie} movie`} />
            <div
              className={
                theme.theme === "dark"
                  ? "details-overview"
                  : "details-overview-light"
              }
            >
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>🔶</span>
                {movie.imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className={theme.theme === "dark" ? "rating" : "rating-light"}>
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={23}
                    onSetRating={setUserRating}
                    color={"#FF7D29"}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <>
                  <p>
                    You rated this movie {watchedUserRating}
                    <span> ⭐</span>
                  </p>
                  <p>Date: {dateWatched}</p>
                </>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
