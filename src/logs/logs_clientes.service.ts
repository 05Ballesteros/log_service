import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Logs } from "src/schemas/log.schema"
import { format } from 'date-fns';
import { obtenerFechaActual } from 'src/utils/fechas';


@Injectable()
export class ClienteLogsService {
    constructor(
        @InjectModel(Logs.name) private readonly logsModel: Model<Logs>,
    ) { }

    async clienteCreado(message: any) {
            console.log("EL mensaje llego correctemnte", message);
            const log = `✅ Cliente registrado correctamente: ${message.Cliente}.`;
            try {
                const logGuardado = await this.logsModel.findOneAndUpdate(
                    { Tipo: "Clientes" },
                    {
                        $push: {
                            Logs: {
                                Correo: message.Correo,
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
    
        async clienteNoCreado(message: any) {
            console.log("EL mensaje llego correctemnte", message);
            const log = `❌ No se pudo registrar el cliente: ${message.Correo}.`;
            try {
                const logGuardado = await this.logsModel.findOneAndUpdate(
                    { Tipo: "Clientes" },
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

        async clienteActualizado(message: any) {
            console.log("EL mensaje llego correctemnte", message);
            const log = `✅ Cliente actualizado correctamente: ${message.Cliente}.`;
            try {
                const logGuardado = await this.logsModel.findOneAndUpdate(
                    { Tipo: "Clientes" },
                    {
                        $push: {
                            Logs: {
                                Correo: message.Correo,
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

        async clienteNoActualizado(message: any) {
            console.log("EL mensaje llego correctemnte", message);
            const log = `❌ No se pudo actualizar el cliente: ${message.Correo}.`;
            try {
                const logGuardado = await this.logsModel.findOneAndUpdate(
                    { Tipo: "Clientes" },
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
};
