import {gql} from "apollo-server";
import {Person} from "../models/Person.js";

const typeDefs = gql`
    type Query{
        hello: String!,
        people: [Person!]!,
        person(name: String!): Person!
    }

    type Person{
        id: ID!
        name: String!,
        age: Int,
        address: String
    }

    type Mutation {
        createPerson(name: String!, age: Int, address: String): Person!
    }
`;

const resolvers = {
    Query: {
        hello: () => 'hello world',
        people: async () => {
           return Person.find();
        },
        person(args) { 
            //need to figure out how to pass arguments to graphql queuries
            return Person.find({person => person.name === args.name});
        } 

    },

    Mutation: {
        createPerson: async (_, {name, age, address}) => {
            const temp = new Person({name, age, address});
            await temp.save();
            console.log("person created in database");
            return temp;
        }
    }
};

export {typeDefs, resolvers};
