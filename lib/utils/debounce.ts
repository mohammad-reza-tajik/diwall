function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout;
    return function (...args: Parameters<T>): ReturnType<T> {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
        return undefined as ReturnType<T>;
    }  as T;
}

export default debounce;