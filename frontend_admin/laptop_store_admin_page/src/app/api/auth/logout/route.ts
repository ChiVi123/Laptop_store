import { cookies } from 'next/headers';
import { EKeys, EPath } from '~/common/enums';

export async function GET() {
    const cookieStore = cookies();
    cookieStore.delete(EKeys.ACCESS_TOKEN);
    cookieStore.delete(EKeys.REFRESH_TOKEN);
    return Response.json({ message: 'logout!!', path: EPath.AUTH_LOGIN });
}
