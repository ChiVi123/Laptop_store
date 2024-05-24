import { cookies } from 'next/headers';
import { Key } from '~/common/enums';

export async function GET() {
    const cookieStore = cookies();
    cookieStore.delete(Key.ACCESS_TOKEN);
    cookieStore.delete(Key.REFRESH_TOKEN);
    return Response.json({ message: 'logout!!' });
}
