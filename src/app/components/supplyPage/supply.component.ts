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
        'id',
        'nome',
        'email',
        'telefone',
        'cpf',
        'delete',
      ];
      dataSource = new MatTableDataSource<any>([]);
    
      @ViewChild(MatPaginator) paginator: MatPaginator;
    
      selectedItem: any;
      dataTable: ColaboratorTable;
      product: ColaboratorInterface[] = [];
      faTrash = faTrash;

    constructor(private carService : CarService) {}
    
     ngOnInit(): void {
     
     }
 
 

     
    
}