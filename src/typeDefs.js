import {gql} from "apollo-server";

export const typeDefs = gql`
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;
