export const CONTENT_TYPE_JSON = 'application/json';
export const FETCH_ERROR = Symbol();
export enum HttpStatus {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    INTERNAL_ERROR = 500,
}
