import {OpenrpcDocument} from "@open-rpc/meta-schema"
import mm from '../dist/build/openrpc.json';

const OpenRPCDocument = mm as OpenrpcDocument;


import {parseOpenRPCDocument} from '@open-rpc/schema-utils-js'

describe("MetaMask API Reference", () => {

  it('can be parsed', async () => {
    expect(OpenRPCDocument).toBeDefined();
    const result = await parseOpenRPCDocument(OpenRPCDocument);
    expect(result).toBeDefined();
  });

});
