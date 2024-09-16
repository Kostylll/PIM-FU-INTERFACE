import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";

import { RouterLink } from "@angular/router";
import { CarInterface } from "../../Interface/CarInterface";
import { CarService } from "../../Services/car.service";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ColaboratorInterface } from "../../Interface/ColaboratorInterface";
import { ColaboratorTable } from "../../Interface/Table/ColaboratorTable";
import { SupplyTable } from "../../Interface/Table/SupplyTable";
import { SupplyInterface } from "../../Interface/SupplyInterface";
import { SupplyService } from "../../Services/supply.service";

@Component({
    selector: 'app-supply',
    standalone: true,
    imports: [CommonModule,
        RouterLink,
        FontAwesomeModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,],
    templateUrl: './supply.component.html',
    styleUrls: ['./supply.component.css']
})

export class SupplyComponent {

    displayedColumns: string[] = [
     
        'nome_Empresa' ,
        'cnpj' ,
        'endereco' ,
        'telefone' ,
      ];
      dataSource = new MatTableDataSource<any>([]);
    
      @ViewChild(MatPaginator) paginator: MatPaginator;
    
      selectedItem: any;
      dataTable: SupplyTable;
      product: SupplyInterface[] = [];
      faTrash = faTrash;

    constructor(private supplyService : SupplyService) {}
    

     getSupply(){
        this.supplyService.getAll().subscribe((res) =>{
            this.product = res;
            this.dataSource = new MatTableDataSource(this.product);
            this.dataSource.paginator = this.paginator;
        })
     }
     
 
 

     
    
}