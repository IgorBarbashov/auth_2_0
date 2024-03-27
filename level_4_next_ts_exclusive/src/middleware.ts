import {NextRequest, NextResponse} from "next/server";
import authService, {EnumTokens} from "./services/auth.service";
import {ADMIN_PAGES} from "@/config/pages/admin.config";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {isAxiosError} from "axios";

export async function middleware(request: NextRequest, response: NextResponse) {
    const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value ?? '';
    let accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value ?? '';

    const isAdminPage = request.url.includes(ADMIN_PAGES.HOME);
    const isProfilePage = request.url.includes('/profile');

    if (!refreshToken) {
        request.cookies.delete(EnumTokens.ACCESS_TOKEN);
        redirectToLogin(isAdminPage, request);
    }

    if (!accessToken) {
        try {
            const data = await authService.getNewTokensByRefresh(refreshToken);
            accessToken = data.accessToken;
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.message === 'invalid token') {
                    console.log('не валидный токен')
                    request.cookies.delete(EnumTokens.ACCESS_TOKEN);
                    return redirectToLogin(isAdminPage, request);
                }
            }
        }
    }

    if (isProfilePage && !refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*', '/admin/:path*']
};

const redirectToLogin = (isAdminPage: boolean, request :NextRequest) => {
    return NextResponse.redirect(
        new URL(isAdminPage ? '/404' : PUBLIC_PAGES.LOGIN, request.url)
    );
};