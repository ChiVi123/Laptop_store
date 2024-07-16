export interface IResponseGHN<T> {
    code: number;
    data: T[];
    message: string;
}
export interface IAddressGHN {
    get key(): string;
    get value(): string;
}
export interface IProvince extends IAddressGHN {
    ProvinceID: number;
    ProvinceName: string;
}
export interface IDistrict extends IAddressGHN {
    DistrictID: number;
    ProvinceID: number;
    DistrictName: string;
}
export interface IWard extends IAddressGHN {
    WardCode: string;
    DistrictID: number;
    WardName: string;
}
