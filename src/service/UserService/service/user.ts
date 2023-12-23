import { User } from "../entity/user";
import { InsertUser } from "./user_creator";
import { DeleteUser } from "./user_deleter";
import { GetAllUsers } from "./user_getter";
import { UpdateUserQuota, UpdateUser } from "./user_updater";

export type UserServiceAdapter = {
	GetAllUsers: () => Promise<User[] | null>;
	InsertUser: (usr: User) => Promise<Error | null>;
	UpdateUser: (usr: User) => Promise<Error | null>;
	UpdateUserQuota: (
		usr: User,
		quotaInMegabytes: number,
	) => Promise<Error | null>;
	GetCurrentUserQuotaInMegabytes: (usrId: string) => Promise<number | Error>;
	RemoveAllUserFiles: (usrId: string) => Promise<Error | null>;
	DeleteUser: (usrId: string) => Promise<Error | null>;
};

export type UserService = {
	GetAllUsers: () => Promise<User[] | null>;
	InsertUser: (usr: User) => Promise<Error | null>;
	UpdateUser: (usr: User) => Promise<Error | null>;
	UpdateUserQuota: (
		usr: User,
		quotaInMegabytes: number,
	) => Promise<Error | null>;
	DeleteUser: (usrId: string) => Promise<Error | null>;
};

export function UserService(deps: UserServiceAdapter): UserService {
	return {
		InsertUser: InsertUser(deps),
		UpdateUser: UpdateUser(deps),
		UpdateUserQuota: UpdateUserQuota(deps),
		DeleteUser: DeleteUser(deps),
		GetAllUsers: GetAllUsers(deps),
	};
}
