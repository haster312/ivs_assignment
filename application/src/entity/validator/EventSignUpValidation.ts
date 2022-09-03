import BaseValidation from "./BaseValidation";
import { body } from "express-validator";
import { EventSignUpRepository } from "../../repositories/EventSignUpRepository";

class EventSignUpValidation extends BaseValidation {
	create() {
		return [
			body("name").not().isEmpty().withMessage("Name is required"),
			body("email").not().isEmpty().withMessage("Email is required"),
			body("email").isEmail().withMessage("Email is not valid"),
			body("email")
				.custom((value) => {
					return new Promise(async (resolve, reject) => {
						const result = await this.repo.getEventSigUpByEmail(value);
						if (!result) {
							resolve(value);
						} else {
							reject();
						}
					});
				})
				.withMessage("This email has been used to sign-up for event"),
		];
	}
}

export default new EventSignUpValidation(EventSignUpRepository);
