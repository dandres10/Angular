import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ListaCelulasResponse } from '../../../../modelos/celula/response/listaCelulasResponse';

@Component({
  selector: 'app-table-lider-celulas-acargo',
  templateUrl: './table-lider-celulas-acargo.component.html',
  styleUrls: ['./table-lider-celulas-acargo.component.css'],
})
export class TableLiderCelulasAcargoComponent implements OnInit {
  constructor() {
    setTimeout(() => {
      this.dataSource.data = this.celulaListaNew;
      this.dataSource.paginator = this.paginator;
      
    }, 2000);
    
  }

  ngOnInit(): void {}

  //#region Variables
  displayedColumns: string[] = ['creationDate', 'host', 'typeGo', 'day'];

  dataSource = new MatTableDataSource<ListaCelulasResponse>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() celulaListaNew: ListaCelulasResponse[];
  //#endregion
}
