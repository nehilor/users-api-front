const TOKEN_KEY = "token";

export const getLocalToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const setLocalToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const updateLocalToken = (newToken: string): void => {
    localStorage.setItem(TOKEN_KEY, newToken);
};

export const removeLocalToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};
