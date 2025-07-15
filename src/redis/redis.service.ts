import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CHANNELS } from './constants/redis_Channels';
import { LogsService } from 'src/logs/logs_tickets.service';
import { UserLogsService } from 'src/logs/logs_usuarios.service';
import { ClienteLogsService } from 'src/logs/logs_clientes.service';

@Injectable()
export class RedisService implements OnModuleInit {
  private redisClient: Redis;
  private subscriber: Redis;

  constructor(
    private readonly logsService: LogsService,
    private readonly userService: UserLogsService,
    private readonly clienteService: ClienteLogsService,
  ) {
    const redisOptions = {
      host: 'redis', // El nombre del servicio en Docker Compose
      port: 6379,    // Puerto expuesto por el contenedor
    };

    this.redisClient = new Redis(redisOptions);
    this.subscriber = new Redis(redisOptions);
  }

  async onModuleInit() {
    // Suscribirse a todos los canales
    const channelNames = Object.values(REDIS_CHANNELS);
    for (const channel of channelNames) {
      await this.subscriber.subscribe(channel, (err) => {
        if (err) {
          console.error(`❌Error al suscribirse al canal ${channel}:`, err.message);
        } else {
          console.log(`✅ Suscrito al canal ${channel}`);
        }
      });
    }

    // Escuchar mensajes de todos los canales
    this.subscriber.on('message', (channel, message) => {
      console.log(`Mensaje recibido en el canal ${channel}:`);
      this.handleMessage(channel, JSON.parse(message));
    });
  }

  // Manejar los mensajes de cada canal
  private async handleMessage(channel: string, message: any) {
    switch (channel) {
      case REDIS_CHANNELS.EXITO_CORREO_TICKET:
        await this.handleExitoCT(message);
        break;
      case REDIS_CHANNELS.ERROR_CORREO_TICKET:
        await this.handleErrorCT(message);
        break;
      case REDIS_CHANNELS.GENERICO:
        await this.handleGenerico(message);
        break;
      case REDIS_CHANNELS.EXITO_CORREO_CONTACTO:
        await this.handleExitoCC(message);
        break;
      case REDIS_CHANNELS.ERROR_CORREO_CONTACTO:
        await this.handleErrorCC(message);
        break;
      case REDIS_CHANNELS.EXITO_CORREO_PENDIENTE:
        await this.handleExitoCP(message);
        break;
      case REDIS_CHANNELS.ERROR_CORREO_PENDIENTE:
        await this.handleErrorCP(message);
        break;
      case REDIS_CHANNELS.USUARIO_CREADO:
        await this.handleUsuariocreado(message);
        break;
      case REDIS_CHANNELS.USUARIO_NO_CREADO:
        await this.handleUsuarioNocreado(message);
        break;
      case REDIS_CHANNELS.USUARIO_ACTUALIZADO:
        await this.handleUsuarioActualizado(message);
        break;
      case REDIS_CHANNELS.USUARIO_NO_ACTUALIZADO:
        await this.handleUsuarioNoActualizado(message);
        break;
      case REDIS_CHANNELS.ESTADO_ACTUALIZADO:
        await this.handleEstadoActualizado(message);
        break;
      case REDIS_CHANNELS.USUARIO_NO_ACTUALIZADO:
        await this.handleEstadoNoActualizado(message);
        break;
      case REDIS_CHANNELS.CLIENTE_CREADO:
        await this.handleClientecreado(message);
        break;
      case REDIS_CHANNELS.CLIENTE_NO_CREADO:
        await this.handleCLienteNocreado(message);
        break;
      case REDIS_CHANNELS.CLIENTE_ACTUALIZADO:
        await this.handleClienteActualizado(message);
        break;
      case REDIS_CHANNELS.CLIENTE_NO_ACTUALIZADO:
        await this.handleClienteNOActualizado(message);
        break;
      default:
        console.warn(`No existe el canal: ${channel}`);
        break;
    }
  }

  private async handleExitoCT(message: any) { await this.logsService.successCorreoTicket(message); }
  private async handleErrorCT(message: any) { await this.logsService.errorCorreoTicket(message); }
  private async handleGenerico(message: any) { await this.logsService.genericLog(message); }
  private async handleExitoCC(message: any) { await this.logsService.successCorreoContacto(message); }
  private async handleErrorCC(message: any) { await this.logsService.errorContacto(message); }
  private async handleExitoCP(message: any) { await this.logsService.successPendiente(message); }
  private async handleErrorCP(message: any) { await this.logsService.errorPendiente(message); }
  private async handleUsuariocreado(message: any) { await this.userService.usuarioCreado(message); }
  private async handleUsuarioNocreado(message: any) { await this.userService.usuarioNoCreado(message); }
  private async handleUsuarioActualizado(message: any) { await this.userService.usuarioActualizado(message); }
  private async handleUsuarioNoActualizado(message: any) { await this.userService.usuarioNoActualizado(message); }
  private async handleEstadoActualizado(message: any) { await this.userService.estadoActualizado(message); }
  private async handleEstadoNoActualizado(message: any) { await this.userService.estadoNoActualizado(message); }
  private async handleClientecreado(message: any) { await this.clienteService.clienteCreado(message); }
  private async handleCLienteNocreado(message: any) { await this.clienteService.clienteNoCreado(message); }
  private async handleClienteActualizado(message: any) { await this.clienteService.clienteActualizado(message); }
  private async handleClienteNOActualizado(message: any) { await this.clienteService.clienteNoActualizado(message); }
  
  // Publicar mensajes en un canal
  publish(channel: string, message: any) {
    this.redisClient.publish(channel, JSON.stringify(message));
  }
}
