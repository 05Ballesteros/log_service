import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false})
export class LogEntry {
  @Prop()
  Id: number;
  
  @Prop()
  Log: string;

  @Prop()
  Username: string;
  
  @Prop({ type: Date })
  Fecha_hora_log: Date;
}

@Schema({ timestamps: true, collection: 'Logs'})
export class Logs extends Document {
  @Prop({ type: [LogEntry] })
  Logs: LogEntry[];
 
  @Prop({ type: String })
  Tipo: string;

}

export const LogsSchema = SchemaFactory.createForClass(Logs);
