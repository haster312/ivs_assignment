import Express, { Request, Response } from "express";
import { Abort, Pagination, Success } from "../services/Response";
import { validationResult } from "express-validator";
import { parseError } from "../helpers/StringHelper";
import EventSignUpValidation from "../entity/validator/EventSignUpValidation";
import { EventSignUpRepository } from "../repositories/EventSignUpRepository";
import { checkAuth } from "./middleware/AuthenMiddleware";
import { getPaginationData, IPagingParam } from "../services/Pagination";

const router = Express.Router();

export const EventSignUpController = () => {
	router.post("/sign-up", EventSignUpValidation.create(), async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return Abort(res, parseError(errors.mapped()), 400);
		}

		try {
			const data = req.body;
			const signUp = await EventSignUpRepository.addEventSignUp(data);

			return Success(res, signUp, "Successful", 201);
		} catch (e) {
			return Abort(res, e);
		}
	});

	/**
	 * Get All Sign Up
	 * Query Path: page, size
	 */
	router.get("/sign-up", checkAuth, async (req: Request, res: Response) => {
		try {
			const filter = req.query;
			const total = await EventSignUpRepository.getTotalEvent();
			const filterParam = getPaginationData(total, filter) as IPagingParam;
			const results = await EventSignUpRepository.getEventSignUps(filterParam);

			return Pagination(res, {
				rows: results,
				total_row: total,
			});
		} catch (e) {
			return Abort(res, e);
		}
	});

	/**
	 * get sign-up detail by id
	 */
	router.get(
		"/sign-up/:id([0-9]+)",
		checkAuth,
		EventSignUpValidation.detail(),
		async (req: Request, res: Response) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return Abort(res, parseError(errors.mapped()), 400);
			}

			try {
				const { id } = req.params;
				const signUp = await EventSignUpRepository.getEventSignUpById(parseInt(id));

				return Success(res, signUp);
			} catch (e) {
				return Abort(res, e);
			}
		},
	);

	return router;
};
