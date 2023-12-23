import { FastifyInstance } from "fastify";
import { AuthService } from "../service/auth";

type AuthHandlerDeps = {
	srv: AuthService;
	app: FastifyInstance;
	someVar: number;
};
// TODO: Use zod or whatever library to
// validate the request body
// generate openapi docs
export function AuthHandler(deps: AuthHandlerDeps) {
	const { srv, app } = deps;
	app.post("/login", async (req, res) => {
		const { email, password } = req.body;
		const token = await srv.Login(email, password);
		if (!token) {
			res.status(401).send();
			return;
		}
		res.status(200).send(token);
	});
}
