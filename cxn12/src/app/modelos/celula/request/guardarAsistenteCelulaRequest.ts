export interface GuardarAsistenteCelulaRequest {
  idDocumentType?: number;
  documentNumber?: string;
  email: string;
  name: string;
  lastName: string;
  phone: string;
  go: number;
  idPersonType: number;
  idUser: number;
  edad?: number;
}
