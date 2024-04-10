import { cookies } from 'next/headers';
import { EKeys, EPath } from '~/common/enums';
import httpRequest from '~/libs/http.request';

export async function GET() {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get(EKeys.REFRESH_TOKEN)?.value ?? '';

    await httpRequest.delete('auth/logout', { params: { token: refreshToken } });

    cookieStore.delete(EKeys.ACCESS_TOKEN);
    cookieStore.delete(EKeys.REFRESH_TOKEN);

    return Response.json({ message: 'logout!!', path: EPath.AUTH_LOGIN });
}
