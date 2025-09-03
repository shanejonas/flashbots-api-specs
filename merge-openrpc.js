const fs = require("fs");
const fetch = require("node-fetch");
const mergeOpenRPC = require("./merge-utils");
const yaml = require("js-yaml");

const OpenRPCDoc = yaml.load(fs.readFileSync(__dirname + "/openrpc.yaml", "utf8"));

const getFilteredExecutionAPIs = async () => {
  const res = await fetch("https://raw.githubusercontent.com/ethereum/execution-apis/337eec34772dc15228092e032fd299042e1ece99/refs-openrpc.json");
  return filterExecutionAPIs(await res.json());
}

// fetch, merge and write
getFilteredExecutionAPIs().then((EthereumOpenRPC) => {
  EthereumOpenRPC.methods.forEach((method) => {
    const ethereumTag = {
      name: "Ethereum API",
      description: "Ethereum Node JSON-RPC method",
    };
    if (!method.tags) {
      method.tags = [];
    }
    method.tags = [...method.tags, ethereumTag];
  });
  if (OpenRPCDoc.components === undefined) {
    OpenRPCDoc.components = {};
  }
  fs.writeFileSync(__dirname + "/src/build/openrpc.json",
    JSON.stringify(
      mergeOpenRPC(OpenRPCDoc, EthereumOpenRPC),
      null,
      4
    )
  );
});

const unneeded = [
  // remove wallet specific methods
  /eth_signTransaction/,
  /eth_sendTransaction/,
  /eth_sign/,
  /eth_accounts/,

  /debug_.*/,
  /engine_.*/,
];

const filterExecutionAPIs = (openrpcDocument) => {
  openrpcDocument.methods = openrpcDocument.methods.filter((method) => {
    const matches = unneeded.some((regex) => regex.test(method.name));
    return !matches;
  });
  return openrpcDocument;
};
