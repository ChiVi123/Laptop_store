export function formatPath(path: string) {
    return path.startsWith('/') ? path.slice(1) : path;
}
export function formatFullUrl(baseUrl: string, url: string) {
    return baseUrl.endsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
}
