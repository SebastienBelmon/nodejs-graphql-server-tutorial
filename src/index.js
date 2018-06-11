const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of hackernuews Clone by seb`,
    feed: () => links,
    link: (root, args) => {
      const link = links.filter(o => o.id === args.id)[0];
      return link;
    },
  },

  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },

    updateLink: (root, args) => {
      let index;
      links.map((o, i) => {
        if (o.id === args.id) {
          index = i;
        }
        return null;
      });

      const newLink = {
        ...links.filter((o, i) => o.id === args.id)[0],
        url: args.url,
        description: args.description,
      };

      links.splice(index, 1, newLink);

      return newLink;
    },

    deleteLink: (root, args) => {
      const link = links.filter(o => o.id === args.id)[0];

      links.filter((o, i) => {
        if (o.id === args.id) {
          return links.splice(i, 1);
        }
        return o;
      });

      return link;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
