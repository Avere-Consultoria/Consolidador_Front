import { useState, useEffect } from 'react';

/**
 * Hook simples para CSS media queries em React.
 *
 * Uso:
 *   const isWide = useMediaQuery('(min-width: 1280px)');
 *   if (isWide) { ...renderiza layout desktop... }
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mql = window.matchMedia(query);
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        setMatches(mql.matches);
        // Modern API
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, [query]);

    return matches;
}
