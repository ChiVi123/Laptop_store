import Link from 'next/link';
import { EPath } from '~/common/enums';

export default function Home() {
    return (
        <main>
            <Link href={EPath.AUTH_LOGIN}>to login</Link>
        </main>
    );
}
