import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ColaboratorInterface } from '../../Interface/ColaboratorInterface';
import { ColaboratorService } from '../../Services/colaborator.service';
import { CpfValidator } from '../../Services/CpfValidator';

@Component({
  selector: 'app-ColaboratorPopUp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './colaboratorPopUp.component.html',
  styleUrls: ['./colaboratorPopUp.component.css'],
})
export class ColaboratorPopUpComponent implements OnInit {
  edit: boolean = false;
  colaborator: ColaboratorInterface;
  TitleText: string = 'Adicionar Colaborador';
  buttonText: string = 'Adicionar';
  register: FormGroup;
  colaborador = {} as ColaboratorInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ColaboratorPopUpComponent>,
    private colabServ: ColaboratorService
  ) {
    this.colaborator = this.data;
  }

  ngOnInit() {
    this.initializeForm();


    if (this.colaborator) {
      this.edit = true;
      this.TitleText = 'Editar Colaborador';
      this.buttonText = 'Salvar Alterações';
     

      this.register.patchValue(this.colaborator);
    } else {
      this.edit = false;
    }
  }


  initializeForm() {
    this.register = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('[^ @]*@[^ @]*'),
      ]),
      telefone: new FormControl(null, [Validators.required]),
      cpf: new FormControl(null, [Validators.required, CpfValidator.validarCpf]),
      endereco: new FormControl(null, [Validators.required]),
      data_Nascimento: new FormControl(null, [Validators.required]),
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
    const message = this.edit ? 'Deseja salvar as alterações deste colaborador?' : 'Deseja adicionar este colaborador?';

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
          this.editColaborator();
          this.dialogRef.close();
        } else {
          this.registerColaborator(); 
          this.dialogRef.close();
        }
      }
    });
  }

  registerColaborator() {
    const formData = this.register.value;

    this.colaborador = {
      ...formData,
      data_Nascimento: formData.data_Nascimento,
    };

    this.colabServ.registerColaborator(this.colaborador).subscribe((res) => {
      console.log('Colaborador registrado:', res);
    });
  }


  editColaborator() {
    const formData = this.register.value;

    this.colaborador = {
      ...formData,
      id: this.colaborator.id,
      data_Nascimento: formData.data_Nascimento,
    };

    this.colabServ.updateColaborator(this.colaborador).subscribe((res) => {
      console.log('Colaborador editado:', res);
      this.dialogRef.close()
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
