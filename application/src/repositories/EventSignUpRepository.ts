import Connection from "../database/Connection";
import EventSignUp from "../entity/EventSignUp";
import { IPagingParam } from "../services/Pagination";

export const EventSignUpRepository = Connection.getRepository(EventSignUp).extend({
	async getTotalEvent() {
		return this.count();
	},
	async getEventSignUps(filter: IPagingParam) {
		return this.find({
			skip: filter.skip,
			take: filter.per_page,
		});
	},
	async getEventSignUpById(id: number) {
		return this.findOneById(id);
	},
	async getEventSigUpByEmail(email: string) {
		return this.findOne({
			where: { email: email },
		});
	},
	async addEventSignUp(data: Record<string, string | number>) {
		const signUp = this.create(data);

		return this.save(signUp);
	},
});
