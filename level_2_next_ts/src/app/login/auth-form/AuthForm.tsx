'use client'

import {useForm} from "react-hook-form";
import {IFormData} from "@/types/types";

interface IAuthFormProps {
    isLogin: boolean;
}

export function AuthForm({isLogin}: IAuthFormProps) {
    const {register, handleSubmit, reset } = useForm<IFormData>();

    return (
        <div>
            AuthForm
        </div>
    );
};