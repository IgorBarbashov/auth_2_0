'use client'

import {useForm} from "react-hook-form";
import {IFormData} from "@/types/types";
import {useRouter} from "next/navigation";

interface IAuthFormProps {
    isLogin: boolean;
}

export function AuthForm({isLogin}: IAuthFormProps) {
    const {register, handleSubmit, reset } = useForm<IFormData>();

    const router = useRouter();

    return (
        <div>
            AuthForm
        </div>
    );
};