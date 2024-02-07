import { StyleContainer } from '~/components/auth.styles';

interface IProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

function NotifySendMail({ searchParams }: IProps) {
    let notify;
    if (searchParams.variant && typeof searchParams.variant === 'string') {
        switch (searchParams.variant) {
            case 'verify':
                notify = 'xác thực';
                break;
            case 'reset-password':
                notify = 'nhận mật khẩu mới';
                break;
            default:
                break;
        }
    }
    return <StyleContainer sx={{ width: 320 }}>Kiểm tra email của bạn để {notify}</StyleContainer>;
}

export default NotifySendMail;
