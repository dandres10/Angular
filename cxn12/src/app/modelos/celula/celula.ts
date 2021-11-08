import { Time } from '@angular/common';

export interface Celula {
  posicion?: number;
  id?: number;
  creationDate?: Date;
  idType?: number;
  type?: string;
  address?: string;
  day?: string;
  hour?: Time;
  idLeader?: number;
  leader?: string;
  phone?: string;
  movil?: string;
  idHost?: number;
  host?: string;
  reasonsClosing?: string;
  numberMembers?: number;
  status?: boolean;
  reporteSemana?: string;
}
