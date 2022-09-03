import Variable, { Database } from "../config/Variable";
import { DataSource } from "typeorm";
import path from "path";
import User from "../entity/User";
import EventSignUp from "../entity/EventSignUp";

const Connection = new DataSource({
	type: "mysql",
	host: Database[Variable.Env].Host,
	port: Database[Variable.Env].Port,
	username: Database[Variable.Env].User,
	password: Database[Variable.Env].Password,
	database: Database[Variable.Env].Name,
	entities: [User, EventSignUp],
	migrations: [path.resolve(__dirname, "../migrations/*.ts")],
	logging: process.env.NODE_ENV === "production" ?? false,
	synchronize: false,
});

export default Connection;
