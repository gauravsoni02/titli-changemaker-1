import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().min(1).max(65_535).default(3001),
  CORS_ORIGINS: z
    .string()
    .default("http://localhost:3000")
    .transform((value) =>
      value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    ),
  DB_NAME: z.string().min(1).default("titli_foundation"),
  MONGO_URL: z.string().min(1).optional(),
  JWT_SECRET: z.string().min(32).optional(),
  STRIPE_API_KEY: z.string().min(1).optional(),
  EMERGENT_EMAIL_KEY: z.string().min(1).optional(),
  EMAIL_FROM_NAME: z.string().min(1).default("Titli Foundation"),
});

export type AppEnvironment = z.infer<typeof environmentSchema>;

/** Validate and normalize environment configuration once during application startup. */
export function validateEnvironment(
  config: Record<string, unknown>,
): AppEnvironment {
  const result = environmentSchema.safeParse(config);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => {
        const key =
          issue.path.length > 0 ? issue.path.join(".") : "environment";
        return `${key}: ${issue.message}`;
      })
      .join("; ");

    // Zod issues contain field names and validation messages, not the supplied values.
    throw new Error(`Invalid environment configuration: ${details}`);
  }

  return result.data;
}
