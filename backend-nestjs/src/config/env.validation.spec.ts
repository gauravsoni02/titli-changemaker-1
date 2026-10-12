import { describe, expect, it } from "vitest";
import { validateEnvironment } from "./env.validation.js";

describe("validateEnvironment", () => {
  it("provides safe development defaults", () => {
    const config = validateEnvironment({});

    expect(config.NODE_ENV).toBe("development");
    expect(config.PORT).toBe(3001);
    expect(config.CORS_ORIGINS).toEqual(["http://localhost:3000"]);
    expect(config.DB_NAME).toBe("titli_foundation");
  });

  it("normalizes comma-separated CORS origins", () => {
    const config = validateEnvironment({
      CORS_ORIGINS:
        "https://titlifoundation.in, https://www.titlifoundation.in",
    });

    expect(config.CORS_ORIGINS).toEqual([
      "https://titlifoundation.in",
      "https://www.titlifoundation.in",
    ]);
  });

  it("rejects ports outside the valid TCP range", () => {
    expect(() => validateEnvironment({ PORT: "70000" })).toThrow(/PORT/);
  });

  it("rejects a JWT secret shorter than 32 characters when supplied", () => {
    expect(() => validateEnvironment({ JWT_SECRET: "too-short" })).toThrow(
      /JWT_SECRET/,
    );
  });
});
