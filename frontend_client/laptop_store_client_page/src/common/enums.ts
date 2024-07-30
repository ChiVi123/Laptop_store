export enum Key {
    ACCESS_TOKEN = 'access-token',
    ACCOUNT = 'account',
    ACCOUNT_TOKEN = 'account-token',
    CART = 'cart',
    IMAGE = 'image',
    LOGO = 'logo',
    REFRESH_TOKEN = 'refresh-token',
    ROOT_CATEGORY = 'root-category',
    X_IS_AUTHENTICATED = 'x-is-authenticated',
    X_URL = 'x-url',
    X_ORIGIN = 'x-origin',
    X_FORWARDED_HOST = 'x-forwarded-host',
    X_FORWARDED_PROTO = 'x-forwarded-proto',
}
export enum Invalid {
    FULL_NAME_REQUIRED = 'Hãy nhập họ tên',
    EMAIL_FORMAT = 'Email không hợp lệ',
    EMAIL_REQUIRED = 'Hãy nhập email',
    PASSWORD_REQUIRED = 'Hãy nhập mật khẩu',
    PASSWORD_CONFIRM_REQUIRED = 'Hãy xác nhận mật khẩu',
    PASSWORD_CONFIRM_MATCH = 'Mật khẩu không khớp',
}
export enum AccountRole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
}
export enum AccountStatus {
    NOT_VERIFIED = 'NOT_VERIFIED',
    ACTIVE = 'ACTIVE',
    BLOCK = 'BLOCK',
}
export enum EntityStatus {
    DRAFT = 'DRAFT',
    ENABLED = 'ENABLED',
    DISABLED = 'DISABLED',
}
export enum Path {
    AUTH_LOGIN = '/auth/login',
}
export enum Label {}
export enum Text {}
