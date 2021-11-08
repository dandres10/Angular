import { Observable } from 'rxjs';
import { Respuesta } from '../../modelos/respuesta/respuesta';

export interface ServiciosRest {
  GuardarEntidad<T>(modelo: any): Observable<Respuesta<T>>;
  EditarEntidad<T>(modelo: any): Observable<Respuesta<T>>;
  ConsultarEntidadLista<T>(): Observable<Respuesta<T>>;
  EliminarEntidad<T>(modelo: any): Observable<Respuesta<T>>;
  ConsultarEntidad<T>(modelo: any): Observable<Respuesta<T>>;
  ConsultarEntidadListaModelo<T>(modelo: any): Observable<Respuesta<T>>;
}
