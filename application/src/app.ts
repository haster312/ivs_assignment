import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Routes from "./controllers/Routes";
import Variable from './config/Variable';
const app = Express();

app.use(
	cors({
		origin: "*",
	}),
);

app.use(Express.static("web"));

app.get("/", (req, res) => {
	return res.sendFile(Variable.WebPath + "/index.html");
});

app.get("/login", (req, res) => {
	return res.sendFile(Variable.WebPath + "/login.html");
});

app.get("/sign-up", (req, res) => {
	return res.sendFile(Variable.WebPath + "/sign-up-list.html");
});

app.use(bodyParser.json());
app.use("/api", Routes());

export default app;
