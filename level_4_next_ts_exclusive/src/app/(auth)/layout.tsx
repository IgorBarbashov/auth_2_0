import type {PropsWithChildren} from 'react';
import {redirect} from 'next/navigation';
import {getServerAuth} from '@/utils/server/get-server-auth';
import {ADMIN_PAGES} from '@/config/pages/admin.config';
import {PUBLIC_PAGES} from '@/config/pages/public.config';

export default async function Layout({children}: PropsWithChildren<unknown>) {
    const user = await getServerAuth();

    console.log('user: ', user);

    if (user?.isLoggedIn) {
        return redirect(user.isAdmin ? ADMIN_PAGES.HOME : PUBLIC_PAGES.HOME);
    }

    return children;
};