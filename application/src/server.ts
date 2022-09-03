import app from "./app";
import Variable from "./config/Variable";
import Connection from "./database/Connection";

const port = Variable.ServerPort ?? 5000;

Connection.initialize()
	.then(() => {
		console.log("Data Source has been initialized!");
		app.listen(port, async () => {
			console.info(`Port ${port}.`);
		});
	})
	.catch((err) => {
		console.error("Error during Data Source initialization:", err);
	});
