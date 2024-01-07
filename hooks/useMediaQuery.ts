import { useEffect, useState } from 'react';

const useMediaQuery = (width:string | number , mode : "up" | "down" = "up") => {
    let query : string;

    if (mode === "up"){
        query = `(min-width: ${width}px)`
    } else {
        query = `(max-width: ${width}px)`
    }

    const [isClient, setIsClient] = useState(false);
    const [matches, setMatches] = useState(isClient ? window.matchMedia(query).matches : false);

    const listener = (event : MediaQueryListEvent) => {
        setMatches(event.matches);
    };

    // Add the listener to the media query and remove it on cleanup
    useEffect(() => {
        setIsClient(true);
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);
        mediaQuery.addEventListener("change", listener);
        return () => mediaQuery.removeEventListener("change", listener);
    }, [query]);

    // Return the state
    return matches;
}

export default useMediaQuery;