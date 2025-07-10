import { Module } from '@nestjs/common';
import { LogsService } from './logs_tickets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, LogsSchema } from 'src/schemas/log.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Logs.name, schema: LogsSchema },
        ]),
    ],
    providers: [LogsService],
    exports: [LogsService], // ✅ Esto es clave para que otros módulos puedan usarlo
})
export class LogsModule { }
