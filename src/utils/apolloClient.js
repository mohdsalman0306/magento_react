// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// // import { useSelector } from 'react-redux';

// const httpLink = new HttpLink({
//   uri: '/graphql',
//   // credentials: 'include',
// });

// const authLink = setContext((_, { headers }) => {
//   // need to update this code, get token from the redux
//   // const customerToken = useSelector((state) => state.auth.token);
//   const token = localStorage.getItem('token');
//   console.log(token)
//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// export default client;

{
  /** this is a correct one */
}
// import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

// // Replace with your GraphQL API endpoint
// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

// // Middleware to attach the Authorization header
// const authLink = setContext((_, { headers }) => {
//   // Get token from Redux, localStorage, or a state management store
//   const token = localStorage.getItem("token"); // or use Redux state: state.auth.token

//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// // Create Apollo Client instance
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
//   defaultOptions: {
//     watchQuery: {
//       suspense: true,
//     },
//   },
// });

// export default client;

{
  /** this is additional one */
}

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Replace with your GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Middleware to attach the Authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token"); // or use Redux state: state.auth.token
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// ✅ Delay Link: Introduces artificial delay before forwarding request
const delayLink = new ApolloLink(
  (operation, forward) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(forward(operation)), 0); // 2-second delay
    })
);

// Combine links: delay → auth → HTTP request
const client = new ApolloClient({
  link: ApolloLink.from([delayLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      suspense: true, // Enable Suspense
    },
    query: {
      suspense: true,
    },
  },
});

export default client;
