import { User } from "../entity/user";
import { UserServiceAdapter } from "./user";

export function InsertUser(deps: UserServiceAdapter) {
	return function (usr: User): Promise<Error | null> {
		return deps.InsertUser(usr);
	};
}
