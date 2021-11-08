import { TipoNotificacion } from './TipoNotificacion';

export interface RespuestaSinEntity {
  result: boolean;
  message: string[];
  notificationType: TipoNotificacion;
 
}
