'use client'

import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form";
import authService from "@/services/auth.service";
import {IFormData} from "@/types/types";

interface IAuthFormProps {
    isLogin: boolean;
}

export function AuthForm({isLogin}: IAuthFormProps) {
    const {register, handleSubmit, reset } = useForm<IFormData>();

    const router = useRouter();

    const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: IFormData) => authService.login(data),
        onSuccess(data) {
            localStorage.setItem('token', data.accessToken);
            reset();
            router.push('/');
        },
    })

    const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
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
        <div>
            AuthForm
        </div>
    );
};