const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const {
  account: { port }
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
    birthDate: String!
    username: String!
  }
  extend type Query {
    me: User
    users: [User]
  }
`;

const resolvers = {
  me: () => {
    return users[0];
  },
  users: {
    __resolveReference(object) {
      return users;
    }
  },
  User: {
    __resolveReference(object) {
      return users.find(user => user.id === object.id);
    }
  }
};

const playground = {
  introspection: true,
  playground: true,
  settings: {
    'editor.theme': 'light',
  },
  /*
  tabs: [
    {
      endpoint,
      query: defaultQuery,
    },
  ],
  */
};

const app = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
      playground
    }
  ])
});

app.listen(port).then(({ url }) => {
  console.log(`server1 ready at ${url}`);
});
