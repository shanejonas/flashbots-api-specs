import type { OpenrpcDocument } from "@open-rpc/meta-schema";

export type MergeableDocument = OpenrpcDocument & {
  methods?: OpenrpcDocument["methods"];
  components?: OpenrpcDocument["components"];
};

export type MergeableMethod = NonNullable<OpenrpcDocument["methods"]>[number];
export type MergeableComponents = NonNullable<OpenrpcDocument["components"]>;

const dedupeMethods = (
  base: MergeableMethod[] = [],
  incoming: MergeableMethod[] = [],
): MergeableMethod[] => {
  const seen = new Set(base.map((method) => method?.name));
  const merged = base.slice();

  for (const method of incoming) {
    if (!method?.name || seen.has(method.name)) {
      continue;
    }
    seen.add(method.name);
    merged.push(method);
  }

  return merged;
};

const asComponents = (doc: MergeableDocument): MergeableComponents => ({
  errors: { ...(doc.components?.errors ?? {}) },
  schemas: { ...(doc.components?.schemas ?? {}) },
  tags: { ...(doc.components?.tags ?? {}) },
  contentDescriptors: { ...(doc.components?.contentDescriptors ?? {}) },
  examplePairings: { ...(doc.components?.examplePairings ?? {}) },
  links: { ...(doc.components?.links ?? {}) },
  examples: { ...(doc.components?.examples ?? {}) },
});

const mergeComponents = (
  first: MergeableComponents,
  second: MergeableComponents,
): MergeableComponents => ({
  errors: { ...first.errors, ...second.errors },
  schemas: { ...first.schemas, ...second.schemas },
  tags: { ...first.tags, ...second.tags },
  contentDescriptors: { ...first.contentDescriptors, ...second.contentDescriptors },
  examplePairings: { ...first.examplePairings, ...second.examplePairings },
  links: { ...first.links, ...second.links },
  examples: { ...first.examples, ...second.examples },
});

const mergedInfo = (first: MergeableDocument, second: MergeableDocument) => {
  if (first.info) {
    return first.info;
  }
  return second.info;
};

const mergedOpenRPCVersion = (first: MergeableDocument, second: MergeableDocument) => {
  if (first.openrpc) {
    return first.openrpc;
  }
  return second.openrpc;
};

const mergeOpenRPC = (
  first: MergeableDocument,
  second: MergeableDocument,
): MergeableDocument => {
  const firstComponents = asComponents(first);
  const secondComponents = asComponents(second);

  return {
    openrpc: mergedOpenRPCVersion(first, second),
    info: mergedInfo(first, second),
    methods: dedupeMethods(first.methods ?? [], second.methods ?? []),
    components: mergeComponents(firstComponents, secondComponents),
  };
};

export default mergeOpenRPC;
