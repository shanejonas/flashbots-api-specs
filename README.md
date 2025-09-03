# Flashbots Protect JSON-RPC API Specification

This repository contains the OpenRPC specification for Flashbots' Wallet JSON-RPC API.
You can view the specs in the following formats:

- [Latest build](https://flashbots.github.io/api-specs/latest/openrpc.json)

[OpenRPC](https://open-rpc.org/) is way to specify JSON-RPC APIs that is versionable,
human-readable, and machine-readable.
It improves the accuracy of documentation, APIs, and clients.

## Contribute

You can contribute to the API specs using the following steps.

1. Edit the API specs in the `openrpc.yaml` file.
   See the [OpenRPC](https://open-rpc.org/) docs for more information on how to format the specs.
2. Run `npm install` if you haven't previously set up the repository.
3. Run `npm run build` to re-generate the output file: `dist/build/openrpc.json`.
4. To view the result, paste that file's contents into the
   [OpenRPC playground](https://playground.open-rpc.org/).

## Build process

When you build the project, the following happens:

1. The API specs `openrpc.yaml` are loaded from the local file system.
2. The [Ethereum Execution API specs](https://github.com/ethereum/execution-apis) are
   fetched from a remote URL and methods not supported/implemented by Flashbots are filtered out.
3. The local Flashbots specs are merged with the Ethereum specs.
4. Each Ethereum method is tagged with the "Ethereum API" tag.
5. The merged and filtered specs are written out to temporary files:
	 - `src/build/openrpc.json`
6. These files are output to the `dist` folder and the `src/build` contents are deleted.

## Publishing process

On release, the specs are published to npm at `@flashbots/api-specs` and to
[GitHub Pages](https://flashbots.github.io/api-specs/latest/openrpc.json).

## Resources

This is based on the [MetaMask API specs repo](https://github.com/MetaMask/api-specs).
