import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';
import { IAllProductResponse, IErrorResponse } from '~/types/response';
import { fetaos, logger } from '~/utils';

export const request = fetaos(process.env.REACT_API_V1);

export async function findAllProduct() {
    const authorization = `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
    try {
        const response = await request.get<IAllProductResponse, IErrorResponse>('admin/products/find-all', {
            headers: { Authorization: authorization },
            cache: 'no-cache',
        });
        return response;
    } catch (error) {
        logger(findAllProduct.name, error);
    }
}
