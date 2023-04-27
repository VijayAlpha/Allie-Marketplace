import axios from "axios";

export default async function fetchGraphQL(
  operationsDoc,
  operationName,
  variables
) {
  const qureyHttpLink =
    process.env.NEXT_PUBLIC_NEAR_NETWORK === "mainnet"
      ? "https://interop-mainnet.hasura.app/v1/graphql"
      : "https://interop-testnet.hasura.app/v1/graphql";

  const result = await axios.post(qureyHttpLink, {
    query: operationsDoc,
    variables: variables,
    operationName: operationName,
  });

  return result.data;
}
