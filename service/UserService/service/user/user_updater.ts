
import { User } from "../../entity/user";
import { UserServiceAdapter } from "./user";

export function UpdateUser(deps: UserServiceAdapter) {
    return function (usr :User): Promise<Error | null> {
        return deps.UpdateUser(usr);
    }
}

export function UpdateUserQuota(deps: UserServiceAdapter) {
    return function (usr :User, quotaInMegabytes:number): Promise<Error | null> {
        return deps.UpdateUserQuota(usr, quotaInMegabytes);
    }
}