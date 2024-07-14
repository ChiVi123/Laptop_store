'use client';

import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

function SelectPayment() {
    const radioGroup = [
        { value: 'cod', content: 'Thanh toán tiền mặt' },
        { value: 'paypal', content: 'Paypal' },
    ];

    return (
        <RadioGroup defaultValue='cod'>
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
