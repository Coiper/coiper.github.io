import { useContext } from "react";
import { WatchedMovieData } from "./MovieDetails";
import { ThemeContext } from "./ThemeProvider";

export function WatchedSummary({ watched }: { watched: WatchedMovieData[] }) {
  const theme = useContext(ThemeContext);
  const avgImdbRating =
    watched.reduce(function (acc: number, obj: WatchedMovieData) {
      return acc + obj.imdbRating;
    }, 0) / watched.length;
  const avgUserRating =
    watched.reduce(function (acc: number, obj: WatchedMovieData) {
      return acc + obj.userRating;
    }, 0) / watched.length;
  const watchRuntime = Number(
    watched.reduce(function (acc: number, obj: WatchedMovieData) {
      return acc + obj.RuntimeMinutes;
    }, 0) / 60
  ).toFixed(1);

  return (
    <div className={theme.theme === "dark" ? "summary" : "summary-light"}>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{watchRuntime} hours</span>
        </p>
      </div>
    </div>
  );
}
