import { EStatus } from './enums';

interface IMapStatusContent {
    content: string;
    color: 'default' | 'primary';
}
export const mapStatus: Record<EStatus, IMapStatusContent> = {
    [EStatus.DISABLED]: { content: 'Ẩn', color: 'default' },
    [EStatus.DRAFT]: { content: 'Nháp', color: 'default' },
    [EStatus.ENABLED]: { content: 'Bật', color: 'primary' },
};
