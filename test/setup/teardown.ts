import { stopPostgresContainer } from "../utils/test-container.util";

export default async () => {
  console.log("\n--- Global Test Environment Teardown ---");

  try {
    await stopPostgresContainer();
  } catch (error) {
    console.error("--- Error during Teardown ---");
    console.error(error);
  }

  console.log("--- Teardown Finished ---\n");
};
