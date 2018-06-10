const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const postRouter = require("./routes/postRoute");
const tagRouter = require("./routes/tagRouter");
const { User } = require("./models");
const { authMiddleware } = require("./libs/auth");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
app.use(morgan("dev"));
app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		graphiql: true
	})
);

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
app.use(authMiddleware);
app.use("/posts", postRouter);
app.use("/tags", tagRouter);
app.post("/signup", async (req, res) => {
	//console.log(req.body);

	const { username, password } = req.body;

	try {
		const user = await User.signup(username, password);
		res.json({
			_id: user._id
		});
	} catch (e) {
		if (e.name === "Dup") {
			return res.status(400).send(e.message);
		}
	}

	//console.log(user.username);
	res.json(user.username);
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const token = await User.createAccessToken(username, password);

	if (!token) {
		res.sendStatus(401);
	}
	return res.json({ token });
});

app.get("/me", async (req, res) => {
	if (!req.user) {
		return res.sendStatus(401);
	}
	res.send(req.user);
});

app.listen(5555, () => {
	console.log(" hi port 5555");
});
