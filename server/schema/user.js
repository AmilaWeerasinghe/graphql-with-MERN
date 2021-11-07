const graphql = require('graphql');

const { 
    GraphQLObjectType, 
    GraphQLString , 
    GraphQLSchema ,
    GraphQLID ,
    GraphQLInt,
    GraphQLList
} = graphql;

const UserType = new graphql.GraphQLObjectType({
    name : 'UserType',
     fields : {
         id : {
             type : graphql.GraphQLInt
         },
         name : {
             type : graphql.GraphQLString
         },
         username:{
             type: graphql.GraphQLString
         },
         email : {
             type : graphql.GraphQLString
         }
}}
);

const RootQuery = new GraphQLObjectType({
    user: {
        description: 'Returns information about user/s',
        type: new graphql.GraphQLList(UserType),
        args: {
          id: { type: graphql.GraphQLInt },
        },
        resolve: async (_, { id }) => {
            if (id) return User.find({ id })
            return User.find() 
        }
      },
})

export default new graphql.GraphQLSchema({
     name: 'Query',
     fields: UserQuery
 })

   
