import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarInterface } from '../Interface/CarInterface';
import { CarService } from '../Services/car.service';
import { MatDialog } from '@angular/material/dialog';
import { SupplyPopUpComponent } from '../popUpComponents/supplyPopUp.component';
import Swal from 'sweetalert2';
import { CarTable } from '../Interface/CarTable';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

declare const $: any;

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  selectedItem: any;
  product: CarInterface[] = [];
  dataTable: CarTable;
  dataSource = new MatTableDataSource<CarInterface>([]);

  constructor(private carServ: CarService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getCars();
    this.dataTable = {
      header: ['modelo', 'cor', 'tipo', 'preço', 'descrição'],
      footer: ['modelo', 'cor', 'tipo', 'preço', 'descrição'],
      dataRows: this.product
    };
  }

  getCars() {
    this.carServ.getCars().subscribe((res) => {
      if (res) {
        let dataCar = res;
        this.dataTable = {
          header: ['modelo', 'cor', 'tipo', 'preço', 'descrição'],
          footer: ['modelo', 'cor', 'tipo', 'preço', 'descrição'],
          dataRows: dataCar,
        };
      }
    });
  }

  onSelected(car: any): void {
    this.selectedItem = car;
    console.log(this.selectedItem);
  }

  doStuff() {
    console.log('working');
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

  openModal() {
    if (!this.selectedItem) {
      this.showAlert();
      return;
    }
    const dialogRef = this.dialog.open(SupplyPopUpComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: '36vw',
      maxHeight: '62vh',
      panelClass: 'scrollable-dialog',
      data: this.selectedItem,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.selectedItem = null;
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
}
