import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { SupplyInterface } from '../../Interface/SupplyInterface';
import { SupplyTable } from '../../Interface/Table/SupplyTable';
import { SupplyService } from '../../Services/supply.service';
import { MatSortModule } from '@angular/material/sort';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SalesTable } from '../../Interface/Table/SalesTable';
import { SalesInterface } from '../../Interface/SalesInterface';
import { SalesService } from '../../Services/sales.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { SalePopUpComponent } from '../popUpComponents/salePopUp/salePopUp.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    RouterLink,
    FontAwesomeModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent {
  displayedColumns: string[] = [
    'nome_Empresa',
    'produto_Vendido',
    'quantidade_Vendida',
    'local_Vendido',
     'delete',
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedItem: any;
  dataTable: SalesTable;
  product: SalesInterface[] = [];
  faTrash = faTrash;

  constructor(private salesService: SalesService, private dialog : MatDialog) {}

  ngOnInit() {
    this.getSales();
  }

  getSales() {
    this.salesService.getSales().subscribe((res) => {
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

  deleteSale(sale: SalesInterface) {
    Swal.fire({
      title: 'Deseja armazenar esta Venda?',
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
        this.salesService.deleteSales(sale.id).subscribe(() => {
          Swal.fire({
            title: 'Venda Armazenada!',
            icon: 'success',
            customClass: {
              popup: 'custom-popup',
              confirmButton: 'custom-confirm-button',
              icon: 'custom-icon',
            },
          });
          this.dialog.closeAll()
          this.getSales();
        });
      }
    });
  }

  openModalRegister() {
    const dialogRef = this.dialog.open(SalePopUpComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '36vw',
      maxHeight: '100vh',
      panelClass: 'scrollable-dialog',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getSales();
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
    const dialogRef = this.dialog.open(SalePopUpComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '36vw',
      maxHeight: '100vh',
      panelClass: 'scrollable-dialog',
      data: this.selectedItem,
    });

    dialogRef.componentInstance.buttonText = 'Atualizar';
    dialogRef.componentInstance.TitleText = 'Atualizar Colaborador';
    dialogRef.componentInstance.registerSale =
      dialogRef.componentInstance.editSale;

    dialogRef.afterClosed().subscribe(() => {
      this.selectedItem = null;
      this.getSales();
    });
  }





}
