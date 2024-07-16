import fetchain from './fetchain';

export const apiRequest = fetchain(process.env.NEXT_PUBLIC_API_SERVER ?? '');
export const apiGHN = fetchain(process.env.NEXT_PUBLIC_API_GHN ?? '', {
    headers: {
        token: process.env.NEXT_PUBLIC_API_GHN_TOKEN ?? '',
        ShopId: process.env.NEXT_PUBLIC_API_GHN_SHOP_ID ?? '',
    },
});
export { default as logger } from './logger';
