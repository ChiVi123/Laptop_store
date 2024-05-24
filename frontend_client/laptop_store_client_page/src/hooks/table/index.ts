import { Options } from './types';

const useTable = <TData>({ data, columns }: Options<TData>) => {
    const getHeaderGroup = () => columns.map((item) => item.header);
    const getRows = () => {};
    const getContext = () => {};
    const getAllSelected = () => {};
    const getIsSelected = () => {};
    const toggleAllSelected = (selected: boolean) => {};
    const toggleSelected = (selected: boolean) => {};
    return {};
};
