const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLInt
} = require("graphql");
const { Post } = require("./models");
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
		}
	}
});

const schema = new GraphQLSchema({ query: QueryType });

module.exports = schema;
