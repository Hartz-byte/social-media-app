import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { supabase } from "../supabase/supabaseClient";

const httpLink = createHttpLink({
  uri: "https://lmulpvhnhfuvnnsbmazn.supabase.co/graphql/v1",
});

const authLink = setContext(async (_, { headers }) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  let token = "";

  if (user) {
    const { data, error } = await supabase.auth.getSession();

    if (data?.session?.access_token) {
      token = data.session.access_token;

      console.log("Supabase Token:", token);
    } else if (error) {
      console.error("Error fetching token:", error);
    }
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
