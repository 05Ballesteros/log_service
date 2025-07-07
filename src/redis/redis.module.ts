import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [LogsModule],
  providers: [RedisService],
  exports: [RedisService],
  controllers: [RedisController],
})
export class RedisModule { }
