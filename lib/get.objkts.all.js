const fetchJSON = require("./fetch.json");
// https://api.hicdex.com/graphiql/

module.exports = async (address) => {
  // console.log(`getting creations and collection for ${address}`);
  const result = await fetchJSON("https://api.hicdex.com/v1/graphql", {
    method: "POST",
    body: {
      query: `
 query allObjkts {
  hic_et_nunc_token(where: {supply: {_gt: 0}}) {
    artifact_uri
    creator_id
    display_uri
    id
    metadata
    mime
    thumbnail_uri
  }
}
`,
      variables: {
        address,
      },
      operationName: "allObjkts",
    },
  });

  if (!result || !result.data || !result.data.hic_et_nunc_token) {
    console.error(result);
    return;
  }

  // console.log(result.data.hic_et_nunc_token_holder);

  return result.data.hic_et_nunc_token;
};
