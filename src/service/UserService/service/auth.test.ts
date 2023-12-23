import t from "tap";
import Sinon from "sinon";
import { User } from "../entity/user";
import { AuthServiceAdapter, Login } from "./auth";

const deps: AuthServiceAdapter = {
	GetUserByEmail: () => Promise.resolve(null),
	CreateTokenByUser: () =>
		Promise.resolve({
			token: "asd",
		}),
};

t.test("should handle error from Login", async (t) => {
	const user: User = {
		email: "",
		id: "asd",
		name: "name",
	};

	const expErr = new Error("error");
	const GetUserByEmailStub = Sinon.stub(deps, "GetUserByEmail").rejects(expErr);
	deps.GetUserByEmail = GetUserByEmailStub;

	const srv = Login(deps);
	try {
		await srv(user.email, "123");
	} catch (err) {
		t.equal(GetUserByEmailStub.calledOnce, true);
		t.equal(GetUserByEmailStub.calledWith(user.email), true);
		t.equal(err, expErr, "InsertUser should throw the same error");
	}

	// Restore the stub after the test case
	GetUserByEmailStub.restore();
});
