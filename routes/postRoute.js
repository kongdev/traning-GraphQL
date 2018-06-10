const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Post } = require("../models");

router.get("/", async (req, res) => {
	const posts = await Post.find();
	res.json(posts);
});
router.get("/:postId", async (req, res) => {
	const postId = req.params.postId;
	//console.log(postId);

	try {
		const post = await Post.findById(postId);
		if (!post) {
			return res.sendStatus(404);
		}
	} catch (err) {
		if (err instanceof mongoose.CastError) {
			return res.sendStatus(404);
		}
		throw err;
	}

	res.json(post);
});

router.post("/create", async (req, res) => {
	if (!req.user) {
		return res.sendStatus(401);
	}
	const { title, content, tags } = req.body;
	const authoId = req.user._id;
	const post = await Post.create({
		title,
		content,
		tags,
		authoId
	});
	res.json(post);
});
module.exports = router;
