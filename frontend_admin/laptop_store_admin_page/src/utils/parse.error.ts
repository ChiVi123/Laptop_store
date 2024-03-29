import { IErrorData } from '~/types/response';

export default function parseError({ error }: { error: string }): IErrorData {
    return error.startsWith('{"') ? JSON.parse(error) : error;
}
