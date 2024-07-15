import { useContext, useRef } from "react";
import { useKey } from "../useKey";
import { MovieType } from "../useMovies";
import { ThemeContext } from "./ThemeProvider";

interface NavBarProps {
  movies: MovieType[] | null;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export function NavBar({ movies, query, setQuery }: NavBarProps) {
  const theme = useContext(ThemeContext);
  return (
    <nav className={theme.theme === "dark" ? "nav-bar" : "nav-bar-light"}>
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <ThemeSwitcher />
      <NumResults movies={movies} />
    </nav>
  );
}
function Logo() {
  const theme = useContext(ThemeContext);
  return (
    <div className="logo">
      <span role="img">{theme.theme === "light" ? "🎬" : "🎃"}</span>
      <h1>Coiper&apos;s Movie Searcher & Watched List</h1>
      <span role="img">🍿</span>
    </div>
  );
}

function Search({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (value: string) => void;
}) {
  const theme = useContext(ThemeContext);
  const inputElement = useRef<HTMLInputElement>(null);

  useKey("Enter", function () {
    if (document.activeElement === inputElement.current) return;
    inputElement.current?.focus();
    setQuery("");
  });

  return (
    <input
      className={theme.theme === "dark" ? "search" : "search-light"}
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <label
      className="container"
      title={theme === "dark" ? "Activate light mode" : "Activate dark mode"}
      aria-label={
        theme === "dark" ? "Activate light mode" : "Activate dark mode"
      }
    >
      <input type="checkbox" onChange={toggleTheme} />
      <div />
    </label>
  );
}

function NumResults({ movies }: { movies: MovieType[] | null }) {
  return (
    <p className="num-results">
      Found <strong>{movies != null ? movies.length : 0}</strong> results
    </p>
  );
}
