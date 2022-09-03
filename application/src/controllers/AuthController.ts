import Express, { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { Abort, Success } from "../services/Response";
import { generateToken } from "../helpers/JWT";
import AuthValidation from "../entity/validator/AuthValidation";
import { validationResult } from "express-validator";
import { parseError } from "../helpers/StringHelper";
import { checkAuth } from './middleware/AuthenMiddleware';

const router = Express.Router();

export const AuthController = () => {
	router.post("/login", AuthValidation.login(), async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return Abort(res, parseError(errors.mapped()), 400);
		}

		try {
			const { email, password } = req.body;
			const user = await UserRepository.getUserByEmail(email);
			if (!user) return Abort(res, "Not Found", 404);

			const valid = user.validatePassword(password);

			if (!valid) {
				return Abort(res, "Email or password is not correct", 400);
			}

			const token = generateToken({ id: user.id, email: user.email });
			return Success(res, { token });
		} catch (e) {
			return Abort(res, e);
		}
	});

	/**
	 * Check if token still valid
	 */
	router.post('/check', checkAuth, (req, res) => {
		return Success(res, {});
	});

	return router;
};
