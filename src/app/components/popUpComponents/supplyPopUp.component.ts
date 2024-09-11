import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { ColaboratorInterface } from '../../Interface/ColaboratorInterface';
import { ColaboratorService } from '../../Services/colaborator.service';
import { CpfValidator } from '../../Services/CpfValidator';


@Component({
  selector: 'app-SupplyPopUp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule,],
  templateUrl: './supplyPopUp.component.html',
  styleUrls: ['./supplyPopUp.component.css'],
})
export class SupplyPopUpComponent implements OnInit {

  colaborator: ColaboratorInterface;
  TitleText: string = 'Adicionar Colaborador';
  buttonText: string = 'Adicionar';
  register: FormGroup;
  colaboratorModel = {} as ColaboratorInterface

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SupplyPopUpComponent>,
    private colabServ: ColaboratorService
  ) {
    this.colaborator = this.data;
  }

  ngOnInit() {
    console.log(this.colaborator);
    this.register = new FormGroup({
        nome : new FormControl(null,[Validators.required]), 
        email: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.pattern("[^ @]*@[^ @]*")]),
        telefone : new FormControl(null,[Validators.required]),
        cpf : new FormControl(null,[Validators.required, CpfValidator.validarCpf]),
        endereco : new FormControl(null,[Validators.required]),
        data_Nascimento : new FormControl(null,[Validators.required]),
    })
  }

  onSubmit(){
    if(this.register.valid){
      this.confirmRegister()
      
    }
    else{
      console.log("Formulário Inválido")
    }
  }



  confirmRegister(){
    Swal.fire({
      title: 'Deseja adicionar este colaborador?',
      icon:'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText : 'Ok',
      customClass: {
        popup : 'custom-popup',
        confirmButton: 'custom-confirm-button',
        icon: 'custom-icon'
    }
    }).then((res) => {
      if(res.isConfirmed) {
        this.registerColaborator()
        this.dialogRef.close();
      }
    })
  }





  registerColaborator() {
    const formData = this.register.value;

    let nome = this.register.get("nome")?.value
    let email = this.register.get("email")?.value
    let telefone = this.register.get("telefone")?.value
    let cpf = this.register.get("cpf")?.value
    let endereco = this.register.get("endereco")?.value
    let data_Nascimento = this.register.get("data_Nascimento")?.value

    this.colaboratorModel.nome = nome;
    this.colaboratorModel.email = email;
    this.colaboratorModel.telefone = telefone;
    this.colaboratorModel.cpf = cpf;
    this.colaboratorModel.endereco = endereco;
    this.colaboratorModel.data_Nascimento = data_Nascimento
 

    this.colabServ.registerColaborator(this.colaboratorModel).subscribe((res) =>{
      console.log(res)
    })



  }

  editColaborator() {
    console.log('Editando');
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
