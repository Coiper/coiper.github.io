import { useState, useEffect } from "react";
import { WatchedMovieData } from "./components/MovieDetails";

export function useLocalStorageState(
  initialState: WatchedMovieData[],
  key: string
) {
  const [value, setValue] = useState<WatchedMovieData[]>(function () {
    const storedValue: string | null = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue] as const;
}
