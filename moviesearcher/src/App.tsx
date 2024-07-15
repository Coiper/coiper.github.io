import MovieDetails, { WatchedMovieData } from "./components/MovieDetails.tsx";
import { useMovies } from "./useMovies.tsx";
import { NavBar } from "./components/NavBar.tsx";
import { useLocalStorageState } from "./useLocalStorageState.tsx";
import { WatchedSummary } from "./components/WatchedSummary.tsx";
import { WatchedMoviesList } from "./components/WatchedMoviesList.tsx";
import { useContext, useState } from "react";
import MovieList from "./components/MovieList.tsx";
import { ThemeContext } from "./components/ThemeProvider";

export const KEY = "b0b768d1";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: WatchedMovieData) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched: WatchedMovieData[]) =>
      watched.filter((movie: WatchedMovieData) => movie.imdbID !== id)
    );
  }

  return (
    <>
      <NavBar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!query && <h1>Start searching movies</h1>}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
                onSelectMovie={handleSelectMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="error">
      <span>🚫</span> {message}
    </p>
  );
}

function Main({ children }: { children: React.ReactNode }) {
  return <main className="main">{children}</main>;
}

function Box({ children }: { children: React.ReactNode }) {
  const theme = useContext(ThemeContext);
  return (
    <div className={theme.theme === "dark" ? "box" : "box-light"}>
      {children}
    </div>
  );
}
