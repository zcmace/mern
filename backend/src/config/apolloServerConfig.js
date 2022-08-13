import { ApolloServer } from "apollo-server"
import {typeDefs, resolvers} from "./graphqlConfig.js";

export const apolloServer = new ApolloServer({typeDefs, resolvers});
