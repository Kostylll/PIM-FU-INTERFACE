import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { SupplyInterface } from "../../Interface/SupplyInterface";
import { SupplyTable } from "../../Interface/Table/SupplyTable";
import { SupplyService } from "../../Services/supply.service";
import { MatSortModule } from "@angular/material/sort";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SalesTable } from "../../Interface/Table/SalesTable";
import { SalesInterface } from "../../Interface/SalesInterface";

@Component({
    selector:'app-sales',
    standalone: true,
    imports: [ RouterLink,
        FontAwesomeModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,],
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.css']
})

export class SalesComponent{

    
    displayedColumns: string[] = [
        'nome_Empresa' ,
        'produto_Vendido' ,
        'quantidade_Vendida' ,
        'local_Vendido' ,
      ];
      dataSource = new MatTableDataSource<any>([]);
    
      @ViewChild(MatPaginator) paginator: MatPaginator;
    
      selectedItem: any;
      dataTable: SalesTable;
      product: SalesInterface[] = [];
      faTrash = faTrash;

    constructor() {}
    

    
 


    
}