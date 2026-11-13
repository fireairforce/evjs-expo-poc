import { defineConfig } from "@evjs/ev";
import { nodeDeploymentAdapter } from "@evjs/ev/deployment";

export default defineConfig({
  routing: { mode: "spa" },
  dev: { port: 3100 },
  plugins: [nodeDeploymentAdapter()],
});
