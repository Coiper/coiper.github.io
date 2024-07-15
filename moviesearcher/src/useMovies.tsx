import { useState, useEffect } from "react";

const KEY: string = "b0b768d1";

interface MoviesList {
  Search: MovieType[];
  Response: string;
  totalResults: number;
}

export interface MovieType {
  Poster: string;
  Title: string;
  Year: number;
  Type: string;
  imdbID: string;
}

export function useMovies(query: string) {
  const [movies, setMovies] = useState<MovieType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setMovies(null);
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data: MoviesList = await res.json();
          if (data.Response === "False" && query.length > 2)
            throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
          setIsLoading(false);
        } catch (err) {
          if (err instanceof Error) {
            if (err.name !== "AbortError") {
              setError(err.message);
            }
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 2) {
        setError("");
        setMovies(null);
        return;
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
