const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

const ToDo = new mongoose.Schema({
  text: String,
  complete: Boolean
});
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
  type ToDo {
    id : ID!
    text : String!
    complete : Boolean !

  }
  type Mutation{
    createToDo(text: String!):ToDo
  }
`
 
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
  Mutation: {
    createToDo: async (_,{text}) => {
      const ToDo = new ToDo({text,complete:false});
      await ToDo.save();
      return ToDo;
    }
  }
}
 
const server = new GraphQLServer({ typeDefs, resolvers })

//once the mongoose database is connected we connect to the server
mongoose.connection.once("open",function(){
  server.start(() => console.log('Server is running on localhost:4000'))  
})
