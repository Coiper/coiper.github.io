import { useRef } from "react";
import { useKey } from "../useKey";

export function Search({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (value: string) => void;
}) {
  const inputElement = useRef<HTMLInputElement>(null);

  useKey("Enter", function () {
    if (document.activeElement === inputElement.current) return;
    inputElement.current?.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}
