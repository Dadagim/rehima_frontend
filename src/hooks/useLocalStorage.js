import { useCallback, useRef, useState } from 'react';

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        if (stored === null) {
            return initialValue;
        }

        try {
            return JSON.parse(stored);
        } catch {
            return stored;
        }
    });
    const valueRef = useRef(value);

    const setStoredValue = useCallback((newValue) => {
        const valueToStore = typeof newValue === 'function'
            ? newValue(valueRef.current)
            : newValue;
        valueRef.current = valueToStore;
        setValue(valueToStore);

        if (valueToStore === null || valueToStore === undefined) {
            localStorage.removeItem(key);
        } else if (typeof valueToStore === 'string') {
            localStorage.setItem(key, valueToStore);
        } else {
            localStorage.setItem(key, JSON.stringify(valueToStore));
        }
    }, [key]);

    return [value, setStoredValue];
}