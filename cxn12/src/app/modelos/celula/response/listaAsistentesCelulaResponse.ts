export interface ListaAsistentesCelulaResponse {
  documentType: string;
  personType: string;
  idDocumentType: number;
  documentNumber: number;
  email: string;
  name: string;
  lastName: string;
  phone: string;
  go: number;
  idPersonType: number;
  idUser: number;
  idMember: number;
  //datos que solomaneja el front
  estadoCheck: boolean;
}
