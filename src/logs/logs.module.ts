import { Module } from '@nestjs/common';
import { LogsTicketsService } from './logs_tickets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, LogsSchema } from 'src/schemas/log.schema';
import { UserLogsService } from './logs_usuarios.service';
import { ClienteLogsService } from './logs_clientes.service';
import { LogsService } from './logs.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Logs.name, schema: LogsSchema },
        ]),
    ],
    providers: [LogsService,LogsTicketsService, UserLogsService, ClienteLogsService],
    exports: [LogsService,LogsTicketsService, UserLogsService, ClienteLogsService], // ✅ Esto es clave para que otros módulos puedan usarlo
})
export class LogsModule { }
