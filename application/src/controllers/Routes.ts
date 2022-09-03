import Express from "express";
import { AuthController } from "./AuthController";
import { EventSignUpController } from "./EventSignUpController";

const router = Express.Router({ mergeParams: true });

const routes = () => {
	/**
	 * Authenticate Controller
	 */
	router.use("/auth", AuthController());

	/**
	 * Event Sign Up Controller
	 */
	router.use("/event", EventSignUpController());

	return router;
};

export default routes;
