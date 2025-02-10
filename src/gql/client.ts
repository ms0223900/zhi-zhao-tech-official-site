import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL =
    // (process.env.NEXT_PUBLIC_SERVER_API_URL + '/graphql') ||
    'http://localhost:1337/graphql';

export const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
});

