const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const {
  server1: { port }
} = require("./config");

const users = [
  {
    id: "1",
    name: "Ada Lovelace",
    birthDate: "1815-12-10",
    username: "@ada"
  },
  {
    id: "2",
    name: "Alan Turing",
    birthDate: "1912-06-23",
    username: "@complete"
  }
];

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
    username: String!
  }
  extend type Query {
    me: User
  }
`;

const resolvers = {
  me: () => {
    return users[0];
  },
  User: {
    __resolveReference(object) {
      return users.find(user => user.id === object.id);
    }
  }
};

const app = new ApolloServer({
  schema: buildFederatedSchema({
    typeDefs,
    resolvers
  })
});

app.listen(port).then(({ url }) => {
  console.log(`server1 ready at ${url}:${port}`);
});
