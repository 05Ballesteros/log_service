import { Module } from '@nestjs/common';
import { LogsService } from './logs_tickets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, LogsSchema } from 'src/schemas/log.schema';
import { UserLogsService } from './logs_usuarios.service';
import { ClienteLogsService } from './logs_clientes.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Logs.name, schema: LogsSchema },
        ]),
    ],
    providers: [LogsService, UserLogsService, ClienteLogsService],
    exports: [LogsService, UserLogsService, ClienteLogsService], // ✅ Esto es clave para que otros módulos puedan usarlo
})
export class LogsModule { }
