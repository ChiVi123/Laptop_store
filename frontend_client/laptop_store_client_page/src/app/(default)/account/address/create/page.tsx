import { Fragment } from 'react';
import { FormAddress } from '~/app/(default)/account/address/_components';

function CreateAddressPage() {
    return (
        <Fragment>
            <h2 className='text-lg mb-6'>Tạo sổ địa chỉ</h2>

            <div className='p-4 bg-white rounded-md'>
                <FormAddress />
            </div>
        </Fragment>
    );
}

export default CreateAddressPage;
