

const storage = {
    getToken: () => {
        return JSON.parse(window.localStorage.getItem(`token`) as string);
    },
    setToken: (token: string) => {
        window.localStorage.setItem(`token`, JSON.stringify(token));
    },
    clearToken: () => {
        window.localStorage.removeItem(`token`);
    },

    // User methods
    getUser: () => {
        return JSON.parse(window.localStorage.getItem('user') as string);
    },
    setUser: (user: any) => {
        window.localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser: () => {
        window.localStorage.removeItem('user');
    },

    // Clock methods
    getClock: () => {
        return JSON.parse(window.localStorage.getItem('clock') as string);
    },
    setClock: (clock: any) => {
        window.localStorage.setItem('clock', JSON.stringify(clock));
    },
    clearClock: () => {
        window.localStorage.removeItem('clock');
    },
};

export default storage;
