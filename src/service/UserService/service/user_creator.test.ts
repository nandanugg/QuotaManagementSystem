import t from "tap";
import { User } from "../entity/user";
import { UserServiceAdapter } from "./user";
import { InsertUser } from "./user_creator";
import sinon from "sinon";

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
	"should call InsertUser with correct user and handle success",
	async () => {
		const user: User = {
			email: "",
			id: "123",
			name: "name",
		};

		const insertUserStub = sinon.stub(deps, "InsertUser").resolves(null);
		deps.InsertUser = insertUserStub;

		const insertUser = InsertUser({ ...deps, InsertUser: insertUserStub });
		const result = await insertUser(user);

		t.equal(insertUserStub.calledOnce, true);
		t.equal(insertUserStub.calledWith(user), true);
		t.equal(result, null, "InsertUser should return null on success");
		// Restore the stub after the test case
		insertUserStub.restore();
	},
);

t.test("should handle error from InsertUser", async () => {
	const user: User = {
		email: "",
		id: "asd",
		name: "name",
	};

	const expErr = new Error("error");
	const insertUserStub = sinon.stub(deps, "InsertUser").rejects(expErr);
	deps.InsertUser = insertUserStub;

	const insertUser = InsertUser({ ...deps, InsertUser: insertUserStub });
	try {
		await insertUser(user);
	} catch (err) {
		t.equal(err, expErr, "InsertUser should throw the same error");
	}
	// Restore the stub after the test case
	insertUserStub.restore();
});
