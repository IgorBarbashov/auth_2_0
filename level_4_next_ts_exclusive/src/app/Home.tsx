'use client'

import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import authService from "@/services/auth.service";
import {useProfile} from "@/app/hooks/useProfile";
import {PUBLIC_PAGES} from "@/config/pages/public.config";

export const Home = () => {
    const {push} = useRouter();

    const {user} = useProfile();

    const {mutate: mutateLogout, isPending: isLogoutPending} = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            push(PUBLIC_PAGES.LOGIN);
        }
    });

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            {user && (
                <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
                    <div
                        className='fixed bottom-0 left-0 flex items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none text-4xl font-bold'>
                        AUTH
                    </div>
                    <button
                        onClick={() => mutateLogout()}
                        disabled={isLogoutPending}
                    >
                        Logout
                    </button>
                </div>
            )}

            <div
                className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <h1 className='text-6xl font-bold'>МК "Авторизация"</h1>
            </div>

            {user && (
                <div>
                    <h2 className='text-2xl font-bold'>Привет, {user.name}</h2>
                    <p className='text-lg'>Ваш email: {user.email}</p>
                </div>
            )}
        </main>
    );
};