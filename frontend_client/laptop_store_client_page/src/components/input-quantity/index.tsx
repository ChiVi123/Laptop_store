'use client';

import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useState } from 'react';

import styles from './input-quantity.module.css';

interface IProps {
    id: number;
    quantity: number;
    stock: number;
    onMinus?: (value: number) => void;
    onPlus?: (value: number) => void;
}

function InputQuantity({ id, quantity = 1, stock, onMinus, onPlus }: IProps) {
    const [value, setValue] = useState<number>(quantity);

    const handleMinus = () => {
        setValue((prev) => (prev > 1 ? prev - 1 : prev));
        if (onMinus && value > 1) {
            onMinus(value - 1);
        }
    };
    const handlePlus = () => {
        setValue((prev) => (prev < stock ? prev + 1 : prev));
        if (onPlus && value < stock) {
            onPlus(value + 1);
        }
    };

    return (
        <div className='flex justify-center gap-1 w-fit mx-auto border border-cv-gray-40 rounded-sm'>
            <button
                type='button'
                aria-label='btn-minus-qty'
                disabled={value === 1}
                onClick={handleMinus}
                className={clsx('flex justify-center items-center w-9 h-9 p-1', { 'opacity-50': value === 1 })}
            >
                <MinusIcon className='w-3 h-3' />
            </button>
            <input
                type='number'
                id={'input-quantity-' + id}
                aria-label={'input-quantity-' + id}
                value={value}
                placeholder='1'
                disabled
                className={styles['input-quantity'] + ' w-9 h-9 p-1 bg-cv-gray-10 text-center'}
                onChange={() => setValue((prev) => prev)}
            />
            <button
                type='button'
                aria-label='btn-plus-qty'
                disabled={value === stock}
                onClick={handlePlus}
                className={clsx('flex justify-center items-center w-9 h-9 p-1', { 'opacity-50': value === stock })}
            >
                <PlusIcon className='w-3 h-3' />
            </button>
        </div>
    );
}

export default InputQuantity;
