import t from "tap";
import Sinon from "sinon";
import bcrypt from "bcrypt";
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

t.test("should handle incorrect password", async (t) => {
	const user: User = {
		email: "",
		id: "asd",
		name: "name",
	};

	const GetUserByEmailStub = Sinon.stub(deps, "GetUserByEmail").resolves(user);
	const bcryptStub = Sinon.stub(bcrypt, "compareSync");
	bcryptStub.returns(false);
	deps.GetUserByEmail = GetUserByEmailStub;

	const srv = Login(deps);
	try {
		let result = await srv(user.email, "123");
		t.equal(result, null);
	} catch (err) {
		t.fail("Login should not throw error");
	}

	t.equal(GetUserByEmailStub.calledOnce, true);
	t.equal(GetUserByEmailStub.calledWith(user.email), true);

	GetUserByEmailStub.restore();
	bcryptStub.restore();
});
