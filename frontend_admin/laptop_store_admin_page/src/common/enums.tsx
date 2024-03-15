export enum EKeys {
    TOKEN = 'token',
    IMAGE = 'image',
    LOGO = 'logo',
    CATEGORY_TREE_VIEW = 'category-tree-view',
    PRODUCT_LIST = 'product-list',
    BRAND_LIST = 'brand-list',
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
    MANAGE_BRAND_ADD = '/manage/brand/add',
    MANAGE_BRAND_EDIT = '/manage/brand/edit',
    MANAGE_BRAND_LIST = '/manage/brand/list',
    MANAGE_CATEGORY = '/manage/category',
    MANAGE_ORDER_LIST = '/manage/order/list',
    MANAGE_PRODUCT_ADD = '/manage/product/add',
    MANAGE_PRODUCT_LIST = '/manage/product/list',
}
