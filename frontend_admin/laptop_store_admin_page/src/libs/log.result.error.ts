import { prefixFormatError } from '~/common/values';

export default function logResultError(label: string, { error }: { error: string }) {
    console.log(...prefixFormatError, label, { error });
}
