'use client'

import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form";
import clsx from "clsx";
import authService from "@/services/auth.service";
import {IFormData} from "@/types/types";
import styles from './AuthForm.module.scss';

interface IAuthFormProps {
    isLogin: boolean;
}

export function AuthForm({isLogin}: IAuthFormProps) {
    const {register, handleSubmit, reset} = useForm<IFormData>();

    const router = useRouter();

    const {mutate: mutateLogin, isPending: isLoginPending} = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: IFormData) => authService.login(data),
        onSuccess(data) {
            localStorage.setItem('token', data.accessToken);
            reset();
            router.push('/');
        },
    })

    const {mutate: mutateRegister, isPending: isRegisterPending} = useMutation({
        mutationKey: ['register'],
        mutationFn: (data: IFormData) => authService.register(data),
        onSuccess(data) {
            localStorage.setItem('token', data.accessToken);
            reset();
            router.push('/');
        },
    })

    const isPending = isLoginPending || isRegisterPending;

    const onSubmit: SubmitHandler<IFormData> = data => {
        isLogin ? mutateLogin(data) : mutateRegister(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-sm mx-auto'>
            <div className='mb-4'>
                <label className='text-gray-600'>
                    Email
                    <input
                        type='email'
                        placeholder='Enter email: '
                        {...register('email', {required: true})}
                        className={clsx(
                            styles['input-field'],
                            'w-full p-2 border rounded focus:outline-none focus:border-indigo-500'
                        )}
                    />
                </label>
            </div>

            <div className='mb-4'>
                <label className='text-gray-600'>
                    Пароль
                    <input
                        type='password'
                        placeholder='Enter password: '
                        {...register('password', {required: true})}
                        className={clsx(
                            styles['input-field'],
                            'w-full p-2 border rounded focus:outline-none focus:border-indigo-500'
                        )}
                    />
                </label>
            </div>

            <div className='mb-4'>
                <button
                    type='submit'
                    className={clsx(
                        styles['btn-primary'],
                        isLogin ? 'bg-indigo-500' : 'bg-green-500',
                        isPending ? 'opacity-75 cursor-not-allowed' : ''
                    )}
                    disabled={isPending}
                >
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </div>
        </form>
    );
};