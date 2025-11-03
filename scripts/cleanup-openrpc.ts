import { rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const buildDirPath = fileURLToPath(new URL("../src/build", import.meta.url));

export const cleanupGeneratedOpenRPC = async (): Promise<void> => {
  await rm(buildDirPath, { recursive: true, force: true });
};

if (import.meta.main) {
  cleanupGeneratedOpenRPC().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
