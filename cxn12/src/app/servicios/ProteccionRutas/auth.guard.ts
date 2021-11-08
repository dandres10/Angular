import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuariorResponse } from '../../modelos/login/response/usuarioResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){
   
    this.obtenerUsuSessionStorange();
  }

  obtenerUsuSessionStorange(){
    try {
      this.datosUsuario =  JSON.parse(sessionStorage.getItem('usu'));
    } catch (error) {
      this.router.navigateByUrl('login');
    }
 
}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // console.log('guars',this.datosUsuario);

      if (this.datosUsuario != null) {
        this.rol.includes(this.datosUsuario.idRol);
        return true;
      }else{
        this.router.navigateByUrl('login');
        return false;
      }
      

  }

  datosUsuario:UsuariorResponse;
  rol: number[] = [2,10];
}
