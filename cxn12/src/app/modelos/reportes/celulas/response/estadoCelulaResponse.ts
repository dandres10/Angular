export interface EstadoCelulaResponse {
  idCell: number;
  hostName: string;
  leaderName: string;
  cellType: string;
  state: boolean;
  closingReasons: string;
}
