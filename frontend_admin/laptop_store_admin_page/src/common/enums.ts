export enum CodeError {
    ACCESS_TOKEN_EXPIRED_ERROR = 'AccessTokenExpiredError',
    INTERNAL_SERVER_ERROR = 'InternalServerError',
    REFRESH_TOKEN_ERROR = 'RefreshTokenError',
    RETURN_ERROR = 'ReturnError',
    RETURN_TO_CLIENT_ERROR = 'ReturnToClientError',
    RETURN_TO_SERVER_ERROR = 'ReturnToServerError',
    TOKEN_ERROR = 'TokenError',
}
export enum HttpStatus {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
}
export enum EKeys {
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
    IMAGE = 'image',
    LOGO = 'logo',
    ROOT_CATEGORY = 'root-category',
    PRODUCT_LIST = 'product-list',
}
export enum EInvalid {
    FULL_NAME_REQUIRED = 'Hãy nhập họ tên',
    EMAIL_FORMAT = 'Email không hợp lệ',
    EMAIL_REQUIRED = 'Hãy nhập email',
    PASSWORD_REQUIRED = 'Hãy nhập mật khẩu',
    PASSWORD_CONFIRM_REQUIRED = 'Hãy xác nhận mật khẩu',
    PASSWORD_CONFIRM_MATCH = 'Mật khẩu không khớp',
}
export enum EAccountRole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
}
export enum EStatus {
    DRAFT = 'DRAFT',
    ENABLED = 'ENABLED',
    DISABLED = 'DISABLED',
}
export enum EPath {
    AUTH_LOGIN = '/auth/login',
    AUTH_REGISTER = '/auth/register',
    AUTH_FORGOT_PASSWORD = '/auth/forgot-password',
    AUTH_SEND_MAIL_VERIFY = '/auth/send-mail-verify',
    AUTH_NOTIFY_SEND_MAIL = '/auth/notify-send-mail',
    AUTH_REGISTRATION_CONFIRM = 'auth/registration-confirm',
    MANAGE_HOME = '/manage/home',
    MANAGE_PROFILE = '/manage/profile',
    MANAGE_CATEGORY = '/manage/category',
    MANAGE_CATEGORY_ADD = '/manage/category/add/',
    MANAGE_CATEGORY_EDIT = '/manage/category/edit/',
    MANAGE_ORDER_LIST = '/manage/order/list',
    MANAGE_PRODUCT_ADD = '/manage/product/add',
    MANAGE_PRODUCT_EDIT = '/manage/product/edit/',
    MANAGE_PRODUCT_LIST = '/manage/product/list',
}
export enum ELabel {
    AVATAR = 'Ảnh đại diện',
    CATEGORY_NAME = 'Tên danh mục',
    EMAIL = 'Email',
    FULL_NAME = 'Họ và tên',
    PASSWORD = 'Mật khẩu',
    PHONE = 'Số điện thoại',
    TURN_ON = 'Bật',
    USERNAME = 'Tên tài khoản',
}
export enum EText {
    ADD = 'Thêm',
    ADD_ROOT_CATEGORY = 'Thêm danh mục gốc',
    ADD_SUBCATEGORY = 'Thêm danh mục con',
    CANCEL = 'Hủy',
    DELETE = 'Xóa',
    EDIT = 'Chỉnh sửa',
    SAVE = 'Lưu',
    SAVE_AND_DISABLE = 'Lưu và bán ngay',
    SAVE_AND_DRAFT = 'Lưu nháp',
    SAVE_AND_ENABLE = 'Lưu và ẩn đi',
}
