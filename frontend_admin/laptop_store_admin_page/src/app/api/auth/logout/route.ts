import { cookies } from 'next/headers';
import { EKeys, EPath } from '~/common/enums';

export async function GET() {
    cookies().delete(EKeys.TOKEN);
    return Response.json({ message: 'logout!!', path: EPath.AUTH_LOGIN });
}
