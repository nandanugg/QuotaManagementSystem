import t from "tap";
import { UserServiceAdapter } from "./user";
import sinon from "sinon";
import { GetAllUsers } from "./user_getter";

const deps: UserServiceAdapter = {
  InsertUser: () => Promise.resolve(null),
  DeleteUser: () => Promise.resolve(null),
  GetAllUsers: () => Promise.resolve(null),
  GetCurrentUserQuotaInMegabytes: () => Promise.resolve(0),
  RemoveAllUserFiles: () => Promise.resolve(null),
  UpdateUserQuota: () => Promise.resolve(null),
  UpdateUser: () => Promise.resolve(null),
};

t.test(
  "should call GetAllUser with correct user and handle success",
  async () => {
    const GetAllUserStub = sinon.stub(deps, "GetAllUsers").resolves(null);
    deps.GetAllUsers = GetAllUserStub;

    const srv = GetAllUsers({ ...deps, GetAllUsers: GetAllUserStub });
    const result = await srv();

    t.equal(GetAllUserStub.calledOnce, true);
    t.equal(result, null, "GetAllUser should return null on success");
    GetAllUserStub.restore();
  },
);

t.test("should handle error from GetAllUser", async () => {
  const expErr = new Error("error");
  const GetAllUserStub = sinon.stub(deps, "GetAllUsers").rejects(expErr);
  deps.GetAllUsers = GetAllUserStub;

  const srv = GetAllUsers({ ...deps, GetAllUsers: GetAllUserStub });
  try {
    await srv();
  } catch (err) {
    t.equal(err, expErr, "GetAllUser should throw the same error");
  }
  GetAllUserStub.restore();
});
