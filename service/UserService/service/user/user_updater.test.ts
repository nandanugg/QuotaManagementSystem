import t from 'tap'
import { UserServiceAdapter } from "./user";
import sinon from 'sinon';
import { UpdateUserQuota, UpdateUser } from './user_updater';
import { User } from '../../entity/user';

const deps: UserServiceAdapter = {
    InsertUser: () => Promise.resolve(null),
    DeleteUser: () => Promise.resolve(null),
    GetAllUsers: () => Promise.resolve(null),
    GetCurrentUserQuotaInMegabytes: () => Promise.resolve(0),
    RemoveAllUserFiles: () => Promise.resolve(null),
    UpdateUserQuota: () => Promise.resolve(null),
    UpdateUser: () => Promise.resolve(null),
};

t.test('should call GetAllUser with correct user and handle success', async () => {
    const user: User = { 
        email:"",
        id: "123",
        name: "name",
     };

    const UpdateUserStub = sinon.stub(deps, 'UpdateUser').resolves(null);
    deps.UpdateUser = UpdateUserStub;

    const srv = UpdateUser({...deps, UpdateUser: UpdateUserStub});
    const result = await srv(user);

    t.equal(UpdateUserStub.calledOnce, true);
    t.equal(UpdateUserStub.calledWith(user), true);
    t.equal(result, null, 'UpdateUser should return null on success');
    UpdateUserStub.restore();
});

t.test('should handle error from UpdateUser', async () => {
    const user: User = { 
        email:"",
        id: "123",
        name: "name",
     };
    const expErr = new Error("error")
    const UpdateUserStub = sinon.stub(deps, 'UpdateUser').rejects(expErr);
    
    deps.UpdateUser = UpdateUserStub;

    const srv = UpdateUser({...deps, UpdateUser: UpdateUserStub})
    try {
        await srv(user);
    } catch (err) {
        t.equal(UpdateUserStub.calledWith(user), true);
        t.equal(err, expErr, 'UpdateUser should throw the same error');
    }
    UpdateUserStub.restore();
});

t.test('should call UpdateUserQuota with correct user and handle success', async () => {
    const user: User = { 
        email:"",
        id: "123",
        name: "name",
     };

    const UpdateUserQuotaStub = sinon.stub(deps, 'UpdateUserQuota').resolves(null);
    deps.UpdateUserQuota = UpdateUserQuotaStub;

    const srv = UpdateUserQuota({...deps, UpdateUserQuota: UpdateUserQuotaStub});
    const result = await srv(user, 1);

    t.equal(UpdateUserQuotaStub.calledOnce, true);
    t.equal(UpdateUserQuotaStub.calledWith(user,1), true);
    t.equal(result, null, 'UpdateUserQuota should return null on success');
    UpdateUserQuotaStub.restore();
});

t.test('should handle error from UpdateUserQuota', async () => {
    const user: User = { 
        email:"",
        id: "123",
        name: "name",
     };
    const expErr = new Error("error")
    const UpdateUserQuotaStub = sinon.stub(deps, 'UpdateUserQuota').rejects(expErr);
    
    deps.UpdateUserQuota = UpdateUserQuotaStub;

    const srv = UpdateUserQuota({...deps, UpdateUserQuota: UpdateUserQuotaStub})
    try {
        await srv(user, 1);
    } catch (err) {
        t.equal(UpdateUserQuotaStub.calledWith(user,1), true);
        t.equal(err, expErr, 'UpdateUserQuota should throw the same error');
    }
    UpdateUserQuotaStub.restore();
});
