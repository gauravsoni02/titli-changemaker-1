import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { AppModule } from "./app.module.js";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const allowedOrigins = config.get<string[]>("CORS_ORIGINS", []);
  const port = config.get<number>("PORT", 3001);

  app.use(helmet());
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableShutdownHooks();

  await app.listen(port, "0.0.0.0");
}

bootstrap().catch((error: unknown) => {
  console.error("Failed to start the Titli NestJS API.", error);
  process.exitCode = 1;
});
