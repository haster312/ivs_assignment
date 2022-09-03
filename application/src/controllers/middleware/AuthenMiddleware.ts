import { Request, RequestHandler, Response } from "express";
import { Unauthorized } from "../../services/Response";
import { validateToken } from "../../helpers/JWT";
import { IUserRequest } from "../../@types/express/Index";

export const checkAuth: RequestHandler = async (req: Request, res: Response, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return Unauthorized(res);
	}

	const token = authorization.replace("Bearer ", "");
	const validatedToken = await validateToken(token);
	if (!validatedToken) {
		return Unauthorized(res);
	}

	(req as IUserRequest).user = validatedToken;
	next();
};
