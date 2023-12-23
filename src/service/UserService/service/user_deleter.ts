import { UserServiceAdapter } from "./user";

export function DeleteUser(deps: UserServiceAdapter) {
  return function (usrId: string): Promise<Error | null> {
    return deps.DeleteUser(usrId);
  };
}
