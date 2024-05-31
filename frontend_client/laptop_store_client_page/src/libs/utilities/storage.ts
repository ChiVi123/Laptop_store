export const storage = {
    set: (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: <T>(key: string, fallback: string): T => JSON.parse(localStorage.getItem(key) ?? fallback),
};
