import t from 'tap'
import { UserServiceAdapter } from "./user";
import sinon from 'sinon';
import { DeleteUser } from './user_deleter';

const deps: UserServiceAdapter = {
    InsertUser: () => Promise.resolve(null),
    DeleteUser: () => Promise.resolve(null),
    GetAllUsers: () => Promise.resolve(null),
    GetCurrentUserQuotaInMegabytes: () => Promise.resolve(0),
    RemoveAllUserFiles: () => Promise.resolve(null),
    UpdateUserQuota: () => Promise.resolve(null),
    UpdateUser: () => Promise.resolve(null),
};

t.test('should call DeleteUser with correct user and handle success', async () => {
    const DeleteUserStub = sinon.stub(deps, 'DeleteUser').resolves(null);
    deps.DeleteUser = DeleteUserStub;

    const srv = DeleteUser({...deps, DeleteUser: DeleteUserStub});
    const result = await srv("123");

    t.equal(DeleteUserStub.calledOnce, true);
    t.equal(DeleteUserStub.calledWith("123"), true);
    t.equal(result, null, 'DeleteUser should return null on success');
    DeleteUserStub.restore();
});

t.test('should handle error from DeleteUser', async () => {
    const expErr = new Error("error")
    const DeleteUserStub = sinon.stub(deps, 'DeleteUser').rejects(expErr);
    deps.DeleteUser = DeleteUserStub;

    const srv = DeleteUser({...deps, DeleteUser: DeleteUserStub})
    try {
        await srv("123");
    } catch (err) {
        t.equal(err, expErr, 'DeleteUser should throw the same error');
    }
    DeleteUserStub.restore();
});
