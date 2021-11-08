import { AsistenteReporte } from '../asistenteReporte';

export interface EnviarReporteAsistenciaRequest {
  done: boolean;
  moth: number;
  week: number;
  theme: string;
  idGo: number;
  year: number;
  listAssistant: AsistenteReporte[];
}
