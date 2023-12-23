import { User } from "../entity/user";
import { UserServiceAdapter } from "./user";

export function GetAllUsers(deps: UserServiceAdapter) {
	return function (): Promise<User[] | null> {
		return deps.GetAllUsers();
	};
}
