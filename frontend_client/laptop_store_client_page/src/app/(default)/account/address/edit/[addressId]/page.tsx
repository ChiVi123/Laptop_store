import { Fragment } from 'react';
import { addressServerAction } from '~/actions';
import { FormAddress } from '~/app/(default)/account/address/_components';

interface IProps {
    params: { addressId: string };
}

async function EditAddressPage({ params }: IProps) {
    const address = await addressServerAction.getById(Number(params.addressId));

    return (
        <Fragment>
            <h2 className='text-lg mb-6'>Tạo sổ địa chỉ</h2>

            <div className='p-4 bg-white rounded-md'>
                <FormAddress address={address} />
            </div>
        </Fragment>
    );
}

export default EditAddressPage;
