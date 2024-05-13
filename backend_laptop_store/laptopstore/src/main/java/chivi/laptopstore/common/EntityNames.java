package chivi.laptopstore.common;

public class EntityNames {
    // Table name
    public static final String TABLE_ACCOUNT = "account";
    public static final String TABLE_CATEGORY_INFO = "category_info";
    public static final String TABLE_CATEGORY_NODE = "category_node";
    public static final String TABLE_PRODUCT_INFO = "product_info";
    public static final String TABLE_PRODUCT_DETAIL = "product_detail";
    public static final String TABLE_ATTRIBUTE = "attribute";
    public static final String TABLE_IMAGE = "image";
    public static final String TABLE_REFRESH_TOKEN = "refresh_token";
    public static final String TABLE_VERIFICATION_TOKEN = "verify_token";
    public static final String TABLE_PRODUCT_CATEGORY = "product_category";
    public static final String TABLE_PRODUCT_IMAGE = "product_image";
    public static final String TABLE_PRODUCT_ATTRIBUTE = "product_attribute";

    // Column name
    public static final String COLUMN_ACCOUNT_ID = "account_id";
    public static final String COLUMN_ACCOUNT_FULL_NAME = "full_name";
    public static final String COLUMN_ACCOUNT_ROLE = "role";

    public static final String COLUMN_CATEGORY_IS_LEAF = "is_leaf";
    public static final String COLUMN_DISCOUNT_RATE = "discount_rate";

    public static final String COLUMN_QUANTITY_STOCK = "quantity_stock";
    public static final String COLUMN_QUANTITY_SOLD = "quantity_sold";
    public static final String COLUMN_RATING_AVERAGE = "rating_average";
    public static final String COLUMN_REVIEW_COUNT = "review_count";
    public static final String COLUMN_LIKE_COUNT = "like_count";

    public static final String COLUMN_THUMBNAIL_URL = "thumbnail_url";

    public static final String COLUMN_IMAGE_PUBLIC_ID = "public_id";
    public static final String COLUMN_IMAGE_SECURE_URL = "secure_url";


    public static final String JOIN_COLUMN_ATTRIBUTE_ID = "attribute_id";
    public static final String JOIN_COLUMN_PRODUCT_ID = "product_id";
    public static final String JOIN_COLUMN_PRODUCT_INFO_ID = "product_info_id";
    public static final String JOIN_COLUMN_CATEGORY_ID = "category_id";
    public static final String JOIN_COLUMN_CATEGORY_INFO_ID = "category_info_id";
    public static final String JOIN_COLUMN_IMAGE_ID = "image_id";
    public static final String JOIN_COLUMN_PARENT_ID = "parent_id";

    public static final String COLUMN_CREATED_AT = "created_at";
    public static final String COLUMN_UPDATED_AT = "updated_at";
}
