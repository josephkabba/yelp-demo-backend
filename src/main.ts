import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import * as csurf from "csurf";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.use(csurf());

  const config = app.get(ConfigService);
  const port = config.get<number>("PORT");
  const URL = config.get<string>("URL");
  const show_validation_message = !config.get<boolean>("VALIDATION_MESSAGE");

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: show_validation_message,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port, URL);
}
bootstrap();
