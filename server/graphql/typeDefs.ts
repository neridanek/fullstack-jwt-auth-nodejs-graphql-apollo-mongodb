import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type userResponse {
    id: ID!
    email: String
    password: String
  }

  type Query {
    users: [userResponse]
    user: userResponse
  }

  type Mutation {
    register(email: String, password: String): userResponse
    login(email: String, password: String): userResponse
  }
`;
