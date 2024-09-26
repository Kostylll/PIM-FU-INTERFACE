import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarInterface } from '../../Interface/CarInterface';

import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CarTable } from '../../Interface/Table/CarTable';
import { ColaboratorPopUpComponent } from '../popUpComponents/colaboratorPopUp.component';
import { ProductTable } from '../../Interface/Table/ProductTable';
import { ProductInterface } from '../../Interface/ProductInterface';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { SupplyService } from '../../Services/supply.service';
import { ProductService } from '../../Services/product.service';
import { MatSortModule } from '@angular/material/sort';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

declare const $: any;

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['nome_Empresa', 'nome_Produto', 'quantidade'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedItem: any;
  dataTable: ProductTable;
  products : ProductInterface;
  product: ProductInterface[] = [];
  faTrash = faTrash;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getSupply()
  }

  getSupply() {
    this.productService.getProduct().subscribe((res) => {
      console.log(res)
      this.product = res;
      this.dataSource = new MatTableDataSource(this.product);
      this.dataSource.paginator = this.paginator;
    });
  }
}
