const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Post } = require("../models");

router.get("/", async (req, res) => {
	const tags = await Post.distinct("tags");
	res.json(tags);
});

router.get("/posts", async (req, res) => {
	if (!req.query.tag) {
		return res.sendStatus(404);
	}
	const posts = await Post.find({
		tags: req.query.tag
	});

	res.json(posts);
});
module.exports = router;
