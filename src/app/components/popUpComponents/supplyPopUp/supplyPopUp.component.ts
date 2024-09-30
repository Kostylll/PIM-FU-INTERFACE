import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SupplyService } from '../../../Services/supply.service';
import { SupplyInterface } from '../../../Interface/SupplyInterface';
import { CpfValidator } from '../../../Services/CpfValidator';

@Component({
  selector: 'app-SupplyPopUp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './supplyPopUp.component.html',
  styleUrls: ['./supplyPopUp.component.css'],
})
export class SupplyPopUpComponent implements OnInit {
  edit: boolean = false;
  supply: SupplyInterface;
  TitleText: string = 'Adicionar Fornecedor';
  buttonText: string = 'Adicionar';
  register: FormGroup;
  supplys = {} as SupplyInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SupplyPopUpComponent>,
    private supplyServ: SupplyService
  ) {
    this.supply = this.data;
  }

  ngOnInit() {
    this.initializeForm();


    if (this.supply) {
      this.edit = true;
      this.TitleText = 'Editar Fornecedor';
      this.buttonText = 'Salvar Alterações';
     

      this.register.patchValue(this.supply);
    } else {
      this.edit = false;
    }
  }


  initializeForm() {
    this.register = new FormGroup({
      nome_Empresa: new FormControl(null, [Validators.required]),
      cnpj: new FormControl(null, [Validators.required, CpfValidator.validarCnpj]), 
      endereco: new FormControl(null, [Validators.required]),
      telefone: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.register.valid) {
      this.confirmRegister();
    } else {
      console.log('Formulário Inválido');
    }
  }

  confirmRegister() {
    const message = this.edit ? 'Deseja salvar as alterações deste Fornecedor?' : 'Deseja adicionar este Fornecedor?';

    Swal.fire({
      title: message,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Ok',
      customClass: {
        popup: 'custom-popup',
        confirmButton: 'custom-confirm-button',
        icon: 'custom-icon',
      },
    }).then((res) => {
      if (res.isConfirmed) {
        if (this.edit) {
          this.editSupply();
          this.dialogRef.close();
        } else {
          this.registerSupply(); 
          this.dialogRef.close();
        }
      }
    });
  }

  registerSupply() {
    const formData = this.register.value;
    this.supplys = {
      ...formData,
    
    };
    this.supplyServ.registerSupply(this.supplys).subscribe((res) => {
      console.log('Fornecedor registrado:', res);
      this.supplyServ.getAll()
    });
  }


  editSupply() {
    const formData = this.register.value;

    this.supplys = {
      ...formData,
      id: this.supply.id,
  
    };

    this.supplyServ.updateSupply(this.supplys).subscribe((res) => {
      console.log('Fornecedor editado:', res);
      this.dialogRef.close()
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
