import { apiGHN } from '~/libs';
import { IDistrict, IProvince, IResponseGHN, IWard } from '~/types/ghn.response';

export async function getAllProvince(signal?: AbortSignal): Promise<IResponseGHN<IProvince> | undefined> {
    return apiGHN
        .get('shiip/public-api/master-data/province', { signal })
        .fetchError((error) => {
            if (!(error instanceof DOMException)) {
                console.log('get all province::', error instanceof DOMException);
            }
        })
        .json<IResponseGHN<IProvince>>();
}
export async function getAllDistrictByProvinceId(
    province_id: string,
    signal?: AbortSignal,
): Promise<IResponseGHN<IDistrict> | undefined> {
    return apiGHN
        .params({ province_id })
        .get('shiip/public-api/master-data/district', { signal })
        .fetchError((error) => {
            if (!(error instanceof DOMException)) {
                console.log('get all district::', error instanceof DOMException);
            }
        })
        .json<IResponseGHN<IDistrict>>();
}
export async function getAllWardByDistrictId(
    district_id: string,
    signal?: AbortSignal,
): Promise<IResponseGHN<IWard> | undefined> {
    return apiGHN
        .params({ district_id })
        .get('shiip/public-api/master-data/ward', { signal })
        .fetchError((error) => {
            if (!(error instanceof DOMException)) {
                console.log('get all ward::', error instanceof DOMException);
            }
        })
        .json<IResponseGHN<IWard>>();
}
