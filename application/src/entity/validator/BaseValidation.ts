import { param } from "express-validator";

export default class BaseValidation {
	public repo;

	constructor(repo: any) {
		this.repo = repo;
	}

	detail() {
		return [
			param("id")
				.exists()
				.toInt()
				.custom((value) => {
					return new Promise(async (resolve, reject) => {
						if (!value) reject();

						const result = await this.repo.findOneById(value);
						if (result) {
							resolve(true);
						} else {
							reject();
						}
					});
				})
				.withMessage("No record"),
		];
	}
}
