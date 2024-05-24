import { cookies } from 'next/headers';
import { Key } from '~/common/enums';
import { RAW_CART } from '~/common/values';
import { apiRequest, logger } from '~/libs';
import { ICartBodyResponse } from '~/types/body.responses';

export async function getCart() {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    if (accessToken) {
        const { payload } = await apiRequest
            .auth(accessToken)
            .get('private/cart', { next: { tags: [Key.CART] } })
            .fetchError((error) => {
                logger.error('get cart::', error.status, error.json);
                return { message: error.message, payload: RAW_CART } as ICartBodyResponse;
            })
            .json<ICartBodyResponse>();
        return payload;
    } else {
        return RAW_CART;
    }
}
