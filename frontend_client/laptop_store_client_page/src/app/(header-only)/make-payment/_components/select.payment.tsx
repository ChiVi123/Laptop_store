'use client';

import { useContext } from 'react';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { MakePaymentContext } from './make.payment.provider';

function SelectPayment() {
    const [, setState] = useContext(MakePaymentContext);
    const radioGroup = [
        { value: 'COD', content: 'Thanh toán tiền mặt' },
        { value: 'PAYPAL', content: 'Paypal' },
    ];

    const handleOnChange = (value: string) => {
        setState((prev) => ({ ...prev, paymentMethod: value }));
    };

    return (
        <RadioGroup defaultValue='COD' onValueChange={handleOnChange}>
            {radioGroup.map((item) => (
                <div key={item.value} className='flex items-center space-x-2'>
                    <RadioGroupItem value={item.value} id={'payment-method-' + item.value} />
                    <Label htmlFor={'payment-method-' + item.value}>{item.content}</Label>
                </div>
            ))}
        </RadioGroup>
    );
}

export default SelectPayment;
