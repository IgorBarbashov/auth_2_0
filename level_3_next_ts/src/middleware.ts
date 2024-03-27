import {NextRequest, NextResponse} from "next/server";
import {EnumTokens} from "./services/auth.service";

export async function middleware(request: NextRequest, response: NextResponse) {
    const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
    const isProfilePage = request.url.includes('/profile');

    if (isProfilePage && !refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

const config = {
    matcher: ['/profile/:path*'],
};