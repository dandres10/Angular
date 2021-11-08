import { Time } from '@angular/common';
export interface SeguimientoCelulaResponse {
  idCell: number;
  hostName: string;
  leaderName: string;
  cellType: string;
  state: boolean;
  done: boolean;
 
  weekMonth: Time;
}
