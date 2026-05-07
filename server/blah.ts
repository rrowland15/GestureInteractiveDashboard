import "dotenv/config"; // Important: Loads .env file
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Path to your schema.prisma
  schema: "prisma/schema.prisma",

  // Database connection URL
  datasource: {
    url: "file:./dev.db",
  },

  // Migration directory
  migrations: {
    path: "prisma/migrations",
  },
});