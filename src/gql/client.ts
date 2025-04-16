import { ApolloClient, InMemoryCache } from "@apollo/client";

export const API_URL = process.env.NODE_ENV === 'production' ?
    (process.env.NEXT_PUBLIC_SERVER_API_URL + '/graphql') :
    'http://localhost:1337/graphql';

export const clientForServer = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
    headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
});


const CSR_API_URL = (process.env.NEXT_PUBLIC_API_URL + '/graphql') || 'http://localhost:1337/graphql';

export const csrClient = new ApolloClient({
    uri: CSR_API_URL,
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
});

