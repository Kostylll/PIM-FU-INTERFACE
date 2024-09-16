import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ColaboratorInterface } from '../../Interface/ColaboratorInterface';
import { ColaboratorTable } from '../../Interface/Table/ColaboratorTable';
import { ColaboratorService } from '../../Services/colaborator.service';
import { SupplyPopUpComponent } from '../popUpComponents/supplyPopUp.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-colaborator',
  templateUrl: './colaborator.component.html',
  standalone: true,
  styleUrls: ['./colaborator.component.css'],
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ],
})
export class ColaboratorComponent {
  displayedColumns: string[] = [
    'nome',
    'email',
    'telefone',
    'cpf',
    'endereço',
    'data_nascimento',
    'delete',
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedItem: any;
  dataTable: ColaboratorTable;
  product: ColaboratorInterface[] = [];
  faTrash = faTrash;

  constructor(
    private colabServ: ColaboratorService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getColaborators();
  }

  getColaborators() {
    this.colabServ.getAll().subscribe((res) => {
      if (res) {
        this.product = res;
        this.dataSource = new MatTableDataSource(this.product);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(
      dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
    );
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  formatCPF(cpf: string): string {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatPhone(phone: string): string {
    if (!phone) return '';

    phone = phone.replace(/\D/g, '');

    if (phone.length === 11) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (phone.length === 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return phone;
  }

  deleteColab(colaborator: ColaboratorInterface) {
    Swal.fire({
      title: 'Deseja desligar este Colaborador?',
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
        this.colabServ.deleteColaborator(colaborator.id).subscribe(() => {
          Swal.fire({
            title: 'Colaborador Desligado!',
            icon: 'success',
            customClass: {
              popup: 'custom-popup',
              confirmButton: 'custom-confirm-button',
              icon: 'custom-icon',
            },
          });
          this.getColaborators();
        });
      }
    });
  }

  onRowClick(row: any): void {
    this.selectedItem = row;
    console.log(this.selectedItem);
    this.showToast('Item Selecionado!');
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

  openModalEdit() {
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

    dialogRef.componentInstance.buttonText = 'Atualizar';
    dialogRef.componentInstance.TitleText = 'Atualizar Colaborador';
    dialogRef.componentInstance.registerColaborator =
      dialogRef.componentInstance.editColaborator;

    dialogRef.afterClosed().subscribe(() => {
      this.selectedItem = null;
      this.getColaborators();
    });
  }

  openModalRegister() {
    const dialogRef = this.dialog.open(SupplyPopUpComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '36vw',
      maxHeight: '100vh',
      panelClass: 'scrollable-dialog',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getColaborators();
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
