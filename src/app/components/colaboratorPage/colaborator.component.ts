import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ColaboratorInterface } from '../../Interface/ColaboratorInterface';
import { ColaboratorTable } from '../../Interface/Table/ColaboratorTable';
import { ColaboratorService } from '../../Services/colaborator.service';
import { SupplyPopUpComponent } from '../popUpComponents/supplyPopUp.component';
@Component({
  selector: 'app-colaborator',
  templateUrl: './colaborator.component.html',
  standalone: true,
  styleUrls: ['./colaborator.component.css'],
  imports: [CommonModule, RouterLink,FontAwesomeModule],
})
export class ColaboratorComponent {
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

    this.dataTable = {
      header: ['Id', 'Nome', 'Email', 'Telefone', 'CPF'],
      footer: ['Id', 'Nome', 'Email', 'Telefone', 'CPF'],
      dataRows: this.product,
    };

    setInterval(() => {
      this.getColaborators();
    }, 5000);
  }

  getColaborators() {
    this.colabServ.getAll().subscribe((res) => {
      console.log(res);
      if (res) {
        let dataColab = res;
        this.dataTable = {
          header: ['Id', 'Nome', 'Email', 'Telefone', 'CPF',''],
          footer: ['Id', 'Nome', 'Email', 'Telefone', 'CPF',''],
          dataRows: dataColab,
        };
      }
    });
  }

  deleteColab(colaborator : ColaboratorInterface){
    Swal.fire({
      title: 'Deseja desligar este Colaborador?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton : true,
      confirmButtonText: "Sim",
      denyButtonText: "Não",
      customClass: {
        popup: 'custom-popup',
        confirmButton: 'custom-confirm-button',
        icon: 'custom-icon',
      },
    }).then((res) => {
      if(res.isConfirmed){
        this.colabServ.deleteColaborator(colaborator.id).subscribe(() =>{
          Swal.fire({
            title:"Colaborador Desligado!",
            showConfirmButton: true,
            icon: 'success',
             customClass: {
        popup: 'custom-popup',
        confirmButton: 'custom-confirm-button',
        icon: 'custom-icon',
      },
          })
        })
      }
    })
  }

  onSelected(colaborator: any): void {
    this.selectedItem = colaborator;
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
    });
  }

  openModalRegister() {
    const dialogRef = this.dialog.open(SupplyPopUpComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: '36vw',
      maxHeight: '62vh',
      panelClass: 'scrollable-dialog',
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
