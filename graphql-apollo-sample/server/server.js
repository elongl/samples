const { gql, ApolloServer } = require('apollo-server');
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  },
  {
    title: 'Why GraphQL',
    author: 'Elon Gliksberg'
  }
];
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

const resolvers = {
  Query: {
    books: () => books
  },
  Mutation: {
    addBook: (root, args) => {
      books.push(args);
      return args;
    }
  }
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`));
