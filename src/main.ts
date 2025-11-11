import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MemoryLoggerService } from './memory.logger.service';

async function bootstrap() {
  //app.use('/payment/hooks', bodyParser.raw({ type: 'application/json' }));
  const app = await NestFactory.create(AppModule, { rawBody: true });
  const memoryLogger = app.get(MemoryLoggerService);
  app.useLogger(memoryLogger);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
