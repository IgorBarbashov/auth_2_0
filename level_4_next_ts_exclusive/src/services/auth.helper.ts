import Cookies from 'js-cookie';

import { EnumTokens } from './auth.service';

export const getAccessTokenFromStorage = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
	return accessToken || null;
}

export const saveAccessTokenToStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1,
	});
}

export const removeAccessTokenFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN);
}
