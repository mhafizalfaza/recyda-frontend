import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://recyda-api.feezco.com",
  cache: new InMemoryCache(),
});

export default client;
