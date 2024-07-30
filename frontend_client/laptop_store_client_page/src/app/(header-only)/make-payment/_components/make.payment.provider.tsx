'use client';

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

type MakePayment = {
    addressId?: number;
    paymentMethod: string;
};

type MakePaymentContext = [MakePayment, Dispatch<SetStateAction<MakePayment>>];

export const MakePaymentContext = createContext<MakePaymentContext>([{ paymentMethod: 'COD' }, () => {}]);

function MakePaymentProvider({ children }: PropsWithChildren) {
    const state = useState<MakePayment>({ paymentMethod: 'COD' });
    return <MakePaymentContext.Provider value={state}>{children}</MakePaymentContext.Provider>;
}

export default MakePaymentProvider;
