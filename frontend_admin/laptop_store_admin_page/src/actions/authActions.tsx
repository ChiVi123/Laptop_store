'use server';

import { TLoginFormData, TRegisterFormData } from '~/types/form.data';
import { ILoginResponse, IRegisterResponse } from '~/types/response';
import { request } from './request';

type TLoginResponse = ILoginResponse | undefined;
type TRegisterResponse = IRegisterResponse | undefined;

export async function loginAction(data: TLoginFormData): Promise<TLoginResponse> {
    try {
        const response = await request.post('auth/login', { data, json: true, cache: 'no-cache' });
        return await response;
    } catch (error) {
        console.log(error);
    }
}

export async function registerAction(data: TRegisterFormData): Promise<TRegisterResponse> {
    try {
        const response = await request.post('auth/register-admin', {
            data,
            json: true,
            cache: 'no-cache',
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
}
