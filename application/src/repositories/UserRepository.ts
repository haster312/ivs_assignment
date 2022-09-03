import Connection from "../database/Connection";
import User from "../entity/User";

export const UserRepository = Connection.getRepository(User).extend({
	async getUserByEmail(email: string | undefined) {
		return await UserRepository.findOne({
			select: ["email", "password"],
			where: {
				email: email,
			},
		});
	},
});
