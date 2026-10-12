import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validateEnvironment } from "./config/env.validation.js";
import { HealthModule } from "./health/health.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
      validate: validateEnvironment,
      cache: true,
      expandVariables: false,
    }),
    HealthModule,
  ],
})
export class AppModule {}
