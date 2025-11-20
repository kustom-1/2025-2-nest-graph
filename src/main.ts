import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ValidationPipe para validar los InputTypes de GraphQL
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    })
  )

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 GraphQL API running on: http://localhost:${process.env.PORT ?? 3000}/graphql`);
}
bootstrap();
