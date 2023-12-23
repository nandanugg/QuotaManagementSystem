import { User } from "../entity/user";
import { Token } from "../entity/token";
import bcrypt from "bcrypt";

export type AuthServiceAdapter = {
	GetUserByEmail(email: string): Promise<User | null>;
	CreateTokenByUser(user: User): Promise<Token>;
};

export type AuthService = {
	Login(email: string, password: string): Promise<Token | null>;
};

export function NewAuthService(adapters: AuthServiceAdapter): AuthService {
	return {
		Login: Login(adapters),
	};
}

export function Login(adapters: AuthServiceAdapter) {
	return async function (
		email: string,
		password: string,
	): Promise<Token | null> {
		const user = await adapters.GetUserByEmail(email);
		if (!user) {
			return null;
		}

		const passwordMatch = bcrypt.compareSync(password, password);
		if (!passwordMatch) {
			return null;
		}

		const token = adapters.CreateTokenByUser(user);
		return token;
	};
}
