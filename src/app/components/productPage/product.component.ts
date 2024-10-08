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
import { ProductPopUpComponent } from '../popUpComponents/productPopUp/productPopUp.component';

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
  displayedColumns: string[] = ['nome_Empresa', 'nome_Produto', 'quantidade','delete'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedItem: any;
  dataTable: ProductTable;
  products : ProductInterface;
  product: ProductInterface[] = [];
  faTrash = faTrash;

  constructor(private productService: ProductService, private dialog : MatDialog) {}

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

  onRowClick(row: any): void {
      this.selectedItem = row;
      console.log(this.selectedItem);
      this.showToast('Item Selecionado!');
    }
  
    showToast(message: string) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('show');
      }, 5);

      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 500);
      }, 1500);
    }

    deleteProduct(product: ProductInterface) {
      Swal.fire({
        title: 'Deseja apagar este produto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
        customClass: {
          popup: 'custom-popup',
          confirmButton: 'custom-confirm-button',
          icon: 'custom-icon',
        },
      }).then((res) => {
        if (res.isConfirmed) {
          this.productService.deleteProduct(product.id).subscribe(() => {
            Swal.fire({
              title: 'Produto Apagado!',
              icon: 'success',
              customClass: {
                popup: 'custom-popup',
                confirmButton: 'custom-confirm-button',
                icon: 'custom-icon',
              },
            });
            this.dialog.closeAll()
            this.getSupply();
          });
        }
      });
    }

    openModalRegister() {
      const dialogRef = this.dialog.open(ProductPopUpComponent, {
        width: '100vw',
        height: '100vh',
        maxWidth: '36vw',
        maxHeight: '100vh',
        panelClass: 'scrollable-dialog',
      });

      dialogRef.afterClosed().subscribe(() => {
        this.getSupply();
      });
    }

    showAlert() {
      Swal.fire({
        title: 'Selecione algum campo para ser editado!',
        icon: 'warning',
        iconColor: '#DAD7CD',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-popup',
          confirmButton: 'custom-confirm-button',
          icon: 'custom-icon',
        },
      });
    }

    openModalEdit() {
      if (!this.selectedItem) {
        this.showAlert();
        return;
      }
      const dialogRef = this.dialog.open(ProductPopUpComponent, {
        width: '100vw',
        height: '100vh',
        maxWidth: '36vw',
        maxHeight: '100vh',
        panelClass: 'scrollable-dialog',
        data: this.selectedItem,
      });

      dialogRef.componentInstance.buttonText = 'Atualizar';
      dialogRef.componentInstance.TitleText = 'Atualizar Colaborador';
      dialogRef.componentInstance.registerProduct =
        dialogRef.componentInstance.editProduct;

      dialogRef.afterClosed().subscribe(() => {
        this.selectedItem = null;
        this.getSupply();
      });
    }






}
