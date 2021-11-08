import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { limpiarCelula } from 'src/app/paginas/celula/reductor/celula.actions';
import { limpiarLogin } from '../../transversal/reductores/login/login.actions';
import { limpiarLider } from 'src/app/transversal/reductores/lideres/lider.actions';
import { limpiarLiderAnfitrion } from '../../transversal/reductores/lideresAnfitrion/liderAnfitrion.actions';
import { UsuariorResponse } from '../../modelos/login/response/usuarioResponse';
import { ItemsMenu } from '../../modelos/menu/itemsMenu';
import { limpiarReporteCelula } from '../../paginas/reportes/reductor/reporteCelula.actions';
import { limpiarReporteSeguimientoCelula } from '../../paginas/reportes/reductor/reporteSeguimiento.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnDestroy {
  activarComponente(ruta: string) {}

  mobileQuery: MediaQueryList;

  fillerNav = [
    { name: 'Enviar', router: 'enviar', icon: 'assets/img/logoConexion12.png' },
    { name: 'Reportes', router: 'reporte', icon: '' },
  ];

  fillerNavButton = [{ name: 'salir', icon: 'arrow_back' }];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.obtenerUsuarioSessionStorange();
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.store.dispatch(limpiarCelula());
    this.store.dispatch(limpiarLogin());
    this.store.dispatch(limpiarLider());
    this.store.dispatch(limpiarLiderAnfitrion());
    this.store.dispatch(limpiarReporteCelula());
    this.store.dispatch(limpiarReporteSeguimientoCelula());
    this.router.navigateByUrl('login');
  }

  obtenerUsuarioSessionStorange() {
    this.usuarioLogeado = JSON.parse(sessionStorage.getItem('usu'));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  //shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  shouldRun = true;
  usuarioLogeado: UsuariorResponse;

  //Modulos --
  modulos: ItemsMenu[] = [
    {
      name: 'Enviar',
      router: 'enviar',
      icon: 'assets/img/enviar.png',
      itemsHijasMenu: [
        {
          name: 'Go',
          router: 'celulas',
          icon: 'accessibility_new',
         },
        {
          name: 'Reportes Go',
          router: 'reportesCelula',
          icon: 'dashboard',
        }
      ],
    },

    // {
    //   name: 'Reportes',
    //   router: '/reportes',
    //   icon: 'assets/img/reporte.png',
    //   itemsHijasMenu: [
    //     {
    //       name: 'Reportes Go',
    //       router: 'reportesCelula',
    //       icon: 'assets/img/logoConexion12.png',
    //     },
    //   ],
    // }

  ];
}
