import dotenv from "dotenv";

dotenv.config();

interface EnvVars {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
}
const loadEnvVariables = (): EnvVars => {
  const requiredEnvVars = ["PORT", "MONGODB_URI", "NODE_ENV"];
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing environment variable: ${envVar}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.MONGODB_URI as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  };
};

export const envVars = loadEnvVariables();
