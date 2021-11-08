import { TipoNotificacion } from './TipoNotificacion';

export interface Respuesta<T> {
  result: boolean;
  entity: T[];
  message: string[];
  notificationType: TipoNotificacion;
}
