import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Logs } from "src/schemas/log.schema"
import { obtenerFechaActual } from 'src/utils/fechas';


@Injectable()
export class UserLogsService {
    constructor(
        @InjectModel(Logs.name) private readonly logsModel: Model<Logs>,
    ) { }

    async usuarioCreado(message: any) {
        console.log("EL mensaje llego correctemnte", message);
        const log = `✅ Usuario ${message.Username} creado correctamente, correo enviado a: ${message.destinatario}.`;
        try {
            const logGuardado = await this.logsModel.findOneAndUpdate(
                { Tipo: "Usuarios" },
                {
                    $push: {
                        Logs: {
                            Username: message.Username,
                            Log: log,
                            Fecha_hora_log: obtenerFechaActual(),
                        },
                    },
                },
                { new: true, upsert: true }
            );

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

    async usuarioNoCreado(message: any) {
        console.log("EL mensaje llego correctemnte", message);
        const log = `❌ No se pudo crear el usuario para: ${message.Nombre}. ${message.error}`;
        try {
            const logGuardado = await this.logsModel.findOneAndUpdate(
                { Tipo: "Usuarios" },
                {
                    $push: {
                        Logs: {
                            Log: log,
                            Fecha_hora_log: obtenerFechaActual(),
                        },
                    },
                },
                { new: true, upsert: true }
            );

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

    async usuarioActualizado(message: any) {
        console.log("EL mensaje llego correctemnte", message);
        const log = `✅ Usuario ${message.Username} actualizado correctamente.`;
        try {
            const logGuardado = await this.logsModel.findOneAndUpdate(
                { Tipo: "Usuarios" },
                {
                    $push: {
                        Logs: {
                            Username: message.Username,
                            Log: log,
                            Fecha_hora_log: obtenerFechaActual(),
                        },
                    },
                },
                { new: true, upsert: true }
            );

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

    async usuarioNoActualizado(message: any) {
        console.log("EL mensaje llego correctemnte", message);
        const log = `❌ No se pudo actualizar el usuario: ${message.Username}. ${message.error}`;
        try {
            const logGuardado = await this.logsModel.findOneAndUpdate(
                { Tipo: "Usuarios" },
                {
                    $push: {
                        Logs: {
                            Username: message.Username,
                            Log: log,
                            Fecha_hora_log: obtenerFechaActual(),
                        },
                    },
                },
                { new: true, upsert: true }
            );

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

    async estadoActualizado(message: any) {
        console.log("EL mensaje llego correctemnte", message);
        const log = `✅ ${message.message}`;
        try {
            const logGuardado = await this.logsModel.findOneAndUpdate(
                { Tipo: "Usuarios" },
                {
                    $push: {
                        Logs: {
                            Username: message.Username,
                            Log: log,
                            Fecha_hora_log: obtenerFechaActual(),
                        },
                    },
                },
                { new: true, upsert: true }
            );

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

    async estadoNoActualizado(message: any) {
        console.log("EL mensaje llego correctemnte", message);
        const log = `✅ ${message.message}`;
        try {
            const logGuardado = await this.logsModel.findOneAndUpdate(
                { Tipo: "Usuarios" },
                {
                    $push: {
                        Logs: {
                            Username: message.Username,
                            Log: log,
                            Fecha_hora_log: obtenerFechaActual(),
                        },
                    },
                },
                { new: true, upsert: true }
            );

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
