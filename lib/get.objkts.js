const fetchJSON = require("./fetch.json");

// test: {"address": "tz1iyFi4WjSttoja7Vi1EJYMEKKSebQyMkF9"}
// https://api.hicdex.com/graphiql/

module.exports = async (address) => {
  // console.log(`getting creations and collection for ${address}`);
  const result = await fetchJSON("https://api.hicdex.com/v1/graphql", {
    method: "POST",
    body: {
      query: `
query addressObjkts($address: String!) {
  hic_et_nunc_token(where: { _or: {token_holders: {holder_id: {_eq: $address}}, creator: {address: {_eq: $address}}}}, distinct_on: id) {
      artifact_uri
      creator_id
      display_uri
      id
      metadata
      mime
      thumbnail_uri
    }
}`,
      variables: {
        address,
      },
      operationName: "addressObjkts",
    },
  });

  if (!result || !result.data || !result.data.hic_et_nunc_token) {
    console.error(result);
    return;
  }

  // console.log(result.data.hic_et_nunc_token_holder);

  return result.data.hic_et_nunc_token;
};
