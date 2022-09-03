import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

type IServerEnv = {
	Env: string;
	ServerPort: number;
	JWTSecret: string;
	WebPath: string;
};

type IDatabase = {
	Host: string;
	Name: string;
	User: string;
	Password: string;
	Port: number | undefined;
};

export type DatabaseEnv = {
	[key: string]: IDatabase;
};

const credentials: IDatabase = {
	Host: process.env.DATABASE_HOST ?? "",
	Name: process.env.DATABASE_NAME ?? "",
	User: process.env.DATABASE_USER ?? "",
	Password: process.env.DATABASE_PASSWORD ?? "",
	Port:
		typeof process.env.DATABASE_PORT === "string"
			? parseInt(process.env.DATABASE_PORT)
			: process.env.DATABASE_PORT,
};

Object.values(credentials).map((value) => {
	if (value === undefined || value === "") {
		throw new Error("Missing database credentials");
	}
});

export const Database: DatabaseEnv = {
	test: {
		Host: "localhost",
		Name: "test_db",
		User: "root",
		Password: "root",
		Port: 3306,
	},
	development: credentials,
	production: credentials,
};

export default {
	Env: process.env.NODE_ENV ?? "development",
	ServerPort: process.env.PORT ? parseInt(process.env.PORT) : 5000,
	JWTSecret: process.env.JWT_SECRET ?? "",
	WebPath: path.join(__dirname, "../../web"),
} as IServerEnv;

export const awsConfig = {
	region: process.env.AWS_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_ACCESS_SECRET,
};
