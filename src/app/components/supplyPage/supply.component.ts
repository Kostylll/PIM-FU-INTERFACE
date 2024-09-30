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
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { SupplyPopUpComponent } from "../popUpComponents/supplyPopUp/supplyPopUp.component";

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
        'delete'
      ];
      dataSource = new MatTableDataSource<any>([]);
    
      @ViewChild(MatPaginator) paginator: MatPaginator;
    
      selectedItem: any;
      dataTable: SupplyTable;
      product: SupplyInterface[] = [];
      faTrash = faTrash;

    constructor(private supplyService : SupplyService,private dialog: MatDialog) {}
    
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
     
   formatCNPJ(cnpj: string): string {
        if (!cnpj) return '';
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
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

      deleteSupply(supply: SupplyInterface) {
        Swal.fire({
          title: 'Deseja apagar este Fornecedor?',
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
            this.supplyService.deleteSupply(supply.id).subscribe(() => {
              Swal.fire({
                title: 'Fornecedor Apagado!',
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
        const dialogRef = this.dialog.open(SupplyPopUpComponent, {
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
        const dialogRef = this.dialog.open(SupplyPopUpComponent, {
          width: '100vw',
          height: '100vh',
          maxWidth: '36vw',
          maxHeight: '100vh',
          panelClass: 'scrollable-dialog',
          data: this.selectedItem,
        });
    
        dialogRef.componentInstance.buttonText = 'Atualizar';
        dialogRef.componentInstance.TitleText = 'Atualizar Colaborador';
        dialogRef.componentInstance.registerSupply =
          dialogRef.componentInstance.editSupply;
    
        dialogRef.afterClosed().subscribe(() => {
          this.selectedItem = null;
          this.getSupply();
        });
      }





}
