import { describe, expect, test } from "bun:test";
import type { OpenrpcDocument } from "@open-rpc/meta-schema";
import mm from "../dist/build/openrpc.json";
import { parseOpenRPCDocument } from "@open-rpc/schema-utils-js";

const OpenRPCDocument = mm as OpenrpcDocument;

describe("MetaMask API Reference", () => {
  test("can be parsed", async () => {
    expect(OpenRPCDocument).toBeDefined();
    const result = await parseOpenRPCDocument(OpenRPCDocument);
    expect(result).toBeDefined();
  });
});
