const { Post, User } = require("../models");

module.exports = {
	Tag: {
		posts: async tag => {
			const posts = await Post.find({ tags: tag.name });
			return posts;
		}
	},
	Post: {
		id: post => post._id,
		author: async (post,args,context) => {
			//const user = await User.findById(post.authorId);
			//console.log(post.authorId)
			//console.log(context)
			const user = await context.loaders.userLoader.load(post.authorId)
			return user;
		},
		tags: async post => {
			return post.tags.map(tag => {
				return { name: tag };
			});
		}
	},
	User: {
		id: user => user._id,
		posts: async (user,args,context) => {
			//const users = await Post.find({ authorId: user._id });
			const posts = await context.loaders.postByUserIdLoader.load(user._id )
			return posts;
		}
	},
	Query: {
		//posts: () => Post.find(),
		posts: async (obj, args) => {
			const tag = args.tag;
			if (tag) {
				const posts = await Post.find({ tags: tag });
				return posts;
			}

			const post = await Post.find();
			return post;
		},
		post: async (obj, args) => {
			const post = await Post.findOne({ _id: args.id });
			return post;
		},
		//post: (obj, { id }) => Post.findById(id),
		users: () => User.find(),
		me: async (obj, args, context) => {
			return context.user;
		}
	},
	Mutation: {
		login: async (obj, { username, password }) => {
			const token = await User.createAccessToken(username, password);
			return token;
		},
		signup: async (obj, { username, password }) => {
			const user = await User.signup(username, password);
			return user;
		},
		createPost: async (obj, args, context) => {}
	}
};
