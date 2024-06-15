'use client';

import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

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

    useEffect(() => {
        setValue((prev) => (prev !== quantity ? quantity : prev));
    }, [quantity]);

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
        <div className='flex justify-start w-fit border border-cv-gray-40 rounded-sm'>
            <button
                type='button'
                aria-label='btn-minus-qty'
                disabled={value === 1}
                onClick={handleMinus}
                className={clsx('flex justify-center items-center size-6 p-1', { 'opacity-50': value === 1 })}
            >
                <MinusIcon className='size-3' />
            </button>
            <input
                type='number'
                id={'input-quantity-' + id}
                aria-label={'input-quantity-' + id}
                value={value}
                placeholder='1'
                disabled
                className={styles['input-quantity'] + ' size-6 p-1 bg-cv-gray-10 text-center'}
                onChange={() => setValue((prev) => prev)}
            />
            <button
                type='button'
                aria-label='btn-plus-qty'
                disabled={value === stock}
                onClick={handlePlus}
                className={clsx('flex justify-center items-center size-6 p-1', { 'opacity-50': value === stock })}
            >
                <PlusIcon className='size-3' />
            </button>
        </div>
    );
}

export default InputQuantity;
