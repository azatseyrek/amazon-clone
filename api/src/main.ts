import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // frontend to be able to access the backend api
  app.enableCors({ origin: "http://localhost:4200" });

  app.setGlobalPrefix("api"); //this is the prefix for all the routes in the backend api (localhost:3000/api/product)

  await app.listen(5050);
}
bootstrap();
