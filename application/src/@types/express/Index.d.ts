// eslint-disable-next-line @typescript-eslint/ban-ts-comment
export {};
import { Request } from "express";

export type IUserRequest = {
	user: {
		id: number;
		email: string;
	};
} & Request;
