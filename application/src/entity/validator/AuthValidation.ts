import BaseValidation from "./BaseValidation";
import { body } from "express-validator";
import { UserRepository } from "../../repositories/UserRepository";

class AuthValidation extends BaseValidation {
	login() {
		return [
			body("email").not().isEmpty().withMessage("Email is required"),
			body("email").isEmail(),
			body("email")
				.custom((value) => {
					return new Promise(async (resolve, reject) => {
						const result = await this.repo.getUserByEmail(value);
						if (result) {
							resolve(result);
						} else {
							reject();
						}
					});
				})
				.withMessage("There is no account with this email"),
			body("password").not().isEmpty().withMessage("Password is required"),
			body("password").isLength({ min: 8 }).withMessage("Password min length is 8 characters"),
		];
	}
}

export default new AuthValidation(UserRepository);
