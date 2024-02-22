import { useEffect, useRef } from "react";

type Handler = () => void;

export function useOutideClick(handler: Handler, listenCapturing = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("click", handleClickOutside, listenCapturing);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside,
        listenCapturing,
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handler, listenCapturing]);

  return ref;
}
