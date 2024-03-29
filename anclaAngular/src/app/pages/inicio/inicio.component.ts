import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(router: Router) {
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
     
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          
          if (element) { element.scrollIntoView(true); }
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
