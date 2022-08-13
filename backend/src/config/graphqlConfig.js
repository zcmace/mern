import {gql} from "apollo-server";
import {Person} from "../models/Person.js";

const typeDefs = gql`
    type Query{
        hello: String!,
        people: [Person!]!,
        person(name: String, age: Int, address: String): [Person]
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
        async person(parent, args, context, info) {
            console.log(args);
            let queryResult = await Person.find(args).exec();
            console.log(queryResult);
            return queryResult; 
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

/*

Old resolver

async (name) =>  { 
            let queryResult = await Person.find({name: name}, (error, data) => {
                if (error){
                    console.log(error);
                } else console.log(data);
            });
            console.log(queryResult);
            return queryResult;
        } 
*/

// function personResolver(input) {
//     let {name} = input;
//     console.log(name);
// }

export {typeDefs, resolvers};
