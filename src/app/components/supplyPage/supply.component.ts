import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";

import { RouterLink } from "@angular/router";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
    
    ngOnInit(){
        this.getSupply()
    }

     getSupply(){
        this.supplyService.getAll().subscribe((res) =>{
            this.product = res;
            this.dataSource = new MatTableDataSource(this.product);
            this.dataSource.paginator = this.paginator;
        })
     }
     
 
 

     
    
}