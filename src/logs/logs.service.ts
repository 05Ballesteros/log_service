import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Logs } from "src/schemas/log.schema"
import { format } from 'date-fns';
import { es } from "date-fns/locale"
import { obtenerFechaActual } from 'src/utils/fechas';

interface LogEntry {
  Id: number;
  Log: string;
  Username: string;
  Fecha_hora_log: Date;
}

@Injectable()
export class LogsService {
    constructor(
        @InjectModel(Logs.name) private readonly logsModel: Model<Logs>,
    ) { }

    async successCorreoTicket(message: any) {
        console.log(message);
        const exito = `✅ Ticket ${message.Id} ${message.accion}: correo enviado al usuario ${message.destinatario}, emails_extra: ${message.emails_extra}`;
        try {
            const log = new this.logsModel({
                Id: message.Id,
                Log: exito,
                Fecha_hora_log: obtenerFechaActual(),
            });
            await log.save();
            console.log("✅ Log guardado desde el microservicio");
            return true;
        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }

    async errorCorreo(message: any) {
        const fallo = `❌ Ticket ${message.Id} ${message.accion}: error enviado correo al usuario ${message.destinatario}, emails_extra: ${message.emails_extra}, correo agregado a la fila.`
        try {
            const log = new this.logsModel({
                Id: message.Id,
                Log: fallo,
                Fecha_hora_log: obtenerFechaActual(),
            });
            await log.save();
            console.log("✅ Log guardado");
            return true;
        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }

    async genericLog(message: any) {
        try {
            const log = new this.logsModel({
                Log: message.message,
                Fecha_hora_log: obtenerFechaActual(),
            });
            await log.save();
            console.log("✅ Log guardado");
            return true;
        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }

    async successCorreoContacto(message: any) {
        const exito = `✅ Cliente contactado por ticket ${message.Id}: correo enviado al cliente ${message.destinatario}, emails_extra: ${message.emails_extra}`;
        try {
            const log = new this.logsModel({
                Id: message.Id,
                Log: exito,
                Fecha_hora_log: obtenerFechaActual(),
            });
            await log.save();
            console.log("✅ Log guardado");
            return true;
        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }

    async errorContacto(message: any) {
        const fallo = `❌ Error al contactar cliente por ticket ${message.Id}: error enviando correo al cliente ${message.destinatario}, emails_extra: ${message.emails_extra}`;
        try {
            const log = new this.logsModel({
                Id: message.Id,
                Log: fallo,
                Fecha_hora_log: obtenerFechaActual(),
            });
            await log.save();
            console.log("✅ Log guardado");
            return true;
        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }

    async successPendiente(message: any) {
        const exito = `✅ Ticket ${message.Id} marcado como pendiente: correo enviado al cliente ${message.destinatario}, emails_extra: ${message.emails_extra}`;
        try {
            const log = new this.logsModel({
                Id: message.Id,
                Log: exito,
                Fecha_hora_log: obtenerFechaActual(),
            });
            await log.save();
            console.log("✅ Log guardado");
            return true;
        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }

    //async errorPendiente(Id: number, destinatario: string, emails_extra: string[]) {
    async errorPendiente(message: any) {
        const fallo = `❌ Ticket ${message.Id} marcado como pendiente: error enviando correo al cliente ${message.destinatario}, emails_extra: ${message.emails_extra}`;
        try {
            const log = new this.logsModel({
                Id: message.Id,
                Log: fallo,
                Fecha_hora_log: obtenerFechaActual(),
            });
            await log.save();
            console.log("✅ Log guardado");
            return true;
        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }

    async findAll() {
        try {
            const result = await this.logsModel.find();

            if (!result || result.length === 0) {
                throw new NotFoundException("No se encontraron logs");
            }

            const formattedResult = result.map((doc) => {
                const obj = doc.toObject();

                const formattedLogs = obj.Logs?.map((entry: LogEntry) => ({
                    ...entry,
                    Fecha_hora_log: format(
                        new Date(entry.Fecha_hora_log),
                        "dd 'de' MMMM 'de' yyyy, h:mm aaaa",
                        { locale: es }
                    ),
                }));

                return {
                    ...obj,
                    Logs: formattedLogs,
                };
            });

            return formattedResult;
        } catch (error) {
            throw new InternalServerErrorException("Ocurrió un error al obtener los logs");
        }
    }

}
