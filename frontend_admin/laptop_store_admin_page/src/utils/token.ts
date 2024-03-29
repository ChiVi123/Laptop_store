import { cookies } from 'next/headers';
import { EKeys } from '~/common/enums';

export default function getSessionToken() {
    return `Bearer ${cookies().get(EKeys.TOKEN)?.value}`;
}
