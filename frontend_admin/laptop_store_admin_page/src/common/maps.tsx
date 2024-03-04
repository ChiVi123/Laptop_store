import { EProductStatus } from './enums';

interface IMapStatusContent {
    content: string;
    color: 'default' | 'primary';
}
export const mapStatus: Record<EProductStatus, IMapStatusContent> = {
    [EProductStatus.DISABLED]: { content: 'Nháp', color: 'default' },
    [EProductStatus.DRAFT]: { content: 'Nháp', color: 'default' },
    [EProductStatus.ENABLED]: { content: 'Nháp', color: 'primary' },
};
