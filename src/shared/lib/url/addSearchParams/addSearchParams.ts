const getSearchParams = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            searchParams.set(key, value);
        }
    });
    return `?${searchParams.toString()}`;
};

export const addSearchParams = (params: Record<string, string>) => {
    window.history.pushState(null, '', getSearchParams(params));
};
