import { User } from "../entity/user";

export type UserServiceDBInterface = {
  GetAllUsers: () => Promise<User[] | null>;
  InsertUser: (usr: User) => Promise<Error | null>;
  UpdateUser: (usr: User) => Promise<Error | null>;
  UpdateUserQuota: (
    usr: User,
    quotaInMegabytes: number,
  ) => Promise<Error | null>;
  DeleteUser: (usrId: string) => Promise<Error | null>;
};
