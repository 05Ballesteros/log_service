import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Logs } from "src/schemas/log.schema"
import { format } from 'date-fns';


@Injectable()
export class LogsTareasService {
    constructor(
        @InjectModel(Logs.name) private readonly logsModel: Model<Logs>,
    ) { }

    async successCorreoTicket(message: any) {
        console.log(message);
        const exito = `✅ Ticket ${message.Id} ${message.accion}: correo enviado al usuario ${message.destinatario}, emails_extra: ${message.emails_extra} 13123123132`;
        try {
            const logGuardado = await this.logsModel.findOneAndUpdate(
                { Tipo: "Ticket" },
                {
                    $push: {
                        Logs: {
                            Id: message.Id,
                            Log: exito,
                            Fecha_hora_log: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
                        },
                    },
                },
                { new: true, upsert: true }
            );
            console.log("Resultado:", logGuardado);

            if (!logGuardado) {
                console.log("❌ Error al guardar el log");
                throw new BadRequestException("Error al capturar logs.");
            } else {
                console.log("✅ Log guardado");
                return true;
            }

        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }


    async errorCorreoTicket(message: any) {
        console.log(message);
        const fallo = ` Ticket ${message.Id} ${message.accion}: error enviado correo al usuario ${message.destinatario}, emails_extra: ${message.emails_extra}, correo agregado a la fila.`;
        try {
            const logGuardado = await this.logsModel.findOneAndUpdate(
                { Tipo: "Ticket" },
                {
                    $push: {
                        Logs: {
                            Id: message.Id,
                            Log: fallo,
                            Fecha_hora_log: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
                        },
                    },
                },
                { new: true, upsert: true }
            );
            console.log("Resultado:", logGuardado);

            if (!logGuardado) {
                console.log("❌ Error al guardar el log");
                throw new BadRequestException("Error al capturar logs.");
            } else {
                console.log("✅ Log guardado");
                return true;
            }

        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }

    async genericLog(message: any) {
        console.log(message);
        try {
            const logGuardado = await this.logsModel.findOneAndUpdate(
                { Tipo: "Ticket" },
                {
                    $push: {
                        Logs: {
                            Log: message.message,
                            Fecha_hora_log: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
                        },
                    },
                },
                { new: true, upsert: true }
            );
            console.log("Resultado:", logGuardado);

            if (!logGuardado) {
                console.log("❌ Error al guardar el log");
                throw new BadRequestException("Error al capturar logs.");
            } else {
                console.log("✅ Log guardado");
                return true;
            }

        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }

    async successCorreoContacto(message: any) {
        console.log(message);
        const exito = `✅ Cliente contactado por ticket ${message.Id}: correo enviado al cliente ${message.destinatario}, emails_extra: ${message.emails_extra}`;
        try {
            const logGuardado = await this.logsModel.findOneAndUpdate(
                { Tipo: "Ticket" },
                {
                    $push: {
                        Logs: {
                            Id: message.Id,
                            Log: exito,
                            Fecha_hora_log: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
                        },
                    },
                },
                { new: true, upsert: true }
            );
            console.log("Resultado:", logGuardado);

            if (!logGuardado) {
                console.log("❌ Error al guardar el log");
                throw new BadRequestException("Error al capturar logs.");
            } else {
                console.log("✅ Log guardado");
                return true;
            }

        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }

    async errorContacto(message: any) {
        console.log(message);
        const fallo = `❌ Error al contactar cliente por ticket ${message.Id}: error enviando correo al cliente ${message.destinatario}, emails_extra: ${message.emails_extra}`;
        try {
            const logGuardado = await this.logsModel.findOneAndUpdate(
                { Tipo: "Ticket" },
                {
                    $push: {
                        Logs: {
                            Id: message.Id,
                            Log: fallo,
                            Fecha_hora_log: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
                        },
                    },
                },
                { new: true, upsert: true }
            );
            console.log("Resultado:", logGuardado);

            if (!logGuardado) {
                console.log("❌ Error al guardar el log");
                throw new BadRequestException("Error al capturar logs.");
            } else {
                console.log("✅ Log guardado");
                return true;
            }

        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }

    async successPendiente(message: any) {
        console.log(message);
        const exito = `✅ Ticket ${message.Id} marcado como pendiente: correo enviado al cliente ${message.destinatario}, emails_extra: ${message.emails_extra}`;
        try {
            const logGuardado = await this.logsModel.findOneAndUpdate(
                { Tipo: "Ticket" },
                {
                    $push: {
                        Logs: {
                            Id: message.Id,
                            Log: exito,
                            Fecha_hora_log: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
                        },
                    },
                },
                { new: true, upsert: true }
            );
            console.log("Resultado:", logGuardado);

            if (!logGuardado) {
                console.log("❌ Error al guardar el log");
                throw new BadRequestException("Error al capturar logs.");
            } else {
                console.log("✅ Log guardado");
                return true;
            }

        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }

    //async errorPendiente(Id: number, destinatario: string, emails_extra: string[]) {
    async errorPendiente(message: any) {
        console.log(message);
        const fallo = `❌ Ticket ${message.Id} marcado como pendiente: error enviando correo al cliente ${message.destinatario}, emails_extra: ${message.emails_extra}`;
        try {
            const logGuardado = await this.logsModel.findOneAndUpdate(
                { Tipo: "Ticket" },
                {
                    $push: {
                        Logs: {
                            Id: message.Id,
                            Log: fallo,
                            Fecha_hora_log: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
                        },
                    },
                },
                { new: true, upsert: true }
            );
            console.log("Resultado:", logGuardado);

            if (!logGuardado) {
                console.log("❌ Error al guardar el log");
                throw new BadRequestException("Error al capturar logs.");
            } else {
                console.log("✅ Log guardado");
                return true;
            }

        } catch (error) {
            throw new BadRequestException("Error al capturar logs.");
        }
    }
};
