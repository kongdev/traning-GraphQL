/*const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLInt,
	GraphQLID
} = require("graphql");
const { Post, User } = require("./models");

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: {
			type: GraphQLID,
			resolve: user => {
				return user._id;
			}
		},
		username: {
			type: GraphQLString
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve: async user => {
				const users = await Post.find({ authorId: user._id });
				return users;
			}
		}
	})
});

const PostType = new GraphQLObjectType({
	name: "Post",
	fields: {
		title: {
			type: GraphQLString
		},
		titleLength: {
			type: GraphQLInt,
			resolve: obj => {
				return obj.title.length;
			}
		},
		id: {
			type: GraphQLID
		},
		tags: {
			type: new GraphQLList(GraphQLString)
		},
		content: {
			type: GraphQLString
		},
		author: {
			type: UserType,
			resolve: async post => {
				const user = await User.findById(post.authorId);
				return user;
			}
		}
	}
});
const QueryType = new GraphQLObjectType({
	name: "Query",
	fields: {
		posts: {
			type: new GraphQLList(PostType),
			resolve: async () => {
				const posts = await Post.find();
				return posts;
			}
		},
		post: {
			type: PostType,
			args: {
				id: { type: GraphQLID }
			},
			resolve: async (obj, args) => {
				const post = await Post.findOne({ _id: args.id });
				return post;
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve: async () => {
				const users = await User.find();
				return users;
			}
		}
	}
});
*/
//const schema = new GraphQLSchema({ query: QueryType });
//module.exports = schema;

const { makeExecutableSchema } = require("graphql-tools");
const fs = require("fs");
const path = require("path");

const typeDefsPath = path.join(__dirname, "graphql", "typedefs.graphql");
const typeDefs = fs.readFileSync(typeDefsPath).toString();

const resolvers = require("./graphql/resolvers");

module.exports = makeExecutableSchema({
	typeDefs,
	resolvers
});
