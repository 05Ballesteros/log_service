import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsController } from './logs/logs.controller';
import { LogsModule } from './logs/logs.module';
import { RedisModule } from './redis/redis.module';
import { RedisController } from './redis/redis.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?authSource=${process.env.MONGODB_AUTHSOURCE}&directConnection=true`),
    LogsModule, AuthModule, ConfigModule.forRoot({
      isGlobal: true,
    }), RedisModule,],
  controllers: [AppController, LogsController, RedisController],
  providers: [AppService],
})
export class AppModule { }
