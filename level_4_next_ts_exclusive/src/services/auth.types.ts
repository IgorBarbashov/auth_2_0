export enum UserRole {
	User = 'USER',
	Admin = 'ADMIN',
}

export interface ITokenInside {
	id: number;
	role: UserRole;
	iat: number;
	exp: number;
}

export type TProtectUserData = Omit<ITokenInside, 'iat' | 'exp'>;
