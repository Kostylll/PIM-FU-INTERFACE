import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SupplyService } from '../../../Services/supply.service';
import { SupplyInterface } from '../../../Interface/SupplyInterface';
import { CpfValidator } from '../../../Services/CpfValidator';
import { SalesInterface } from '../../../Interface/SalesInterface';
import { SalesService } from '../../../Services/sales.service';
import { ProductService } from '../../../Services/product.service';

@Component({
  selector: 'app-SupplyPopUp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './salePopUp.component.html',
  styleUrls: ['./salePopUp.component.css'],
})
export class SalePopUpComponent implements OnInit {
  edit: boolean = false;
  sale: SalesInterface;
  TitleText: string = 'Adicionar Venda';
  buttonText: string = 'Adicionar';
  register: FormGroup;
  sales = {} as SalesInterface;
  produtos: any[] = []
  empresas : any[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SalesInterface>,
    private saleServ: SalesService,
    private productServ : ProductService,
    private supplyServ : SupplyService
  ) {
    this.sale = this.data;
  }

  ngOnInit() {
    this.initializeForm();

    if (this.sale) {
      this.edit = true;
      this.TitleText = 'Editar Venda';
      this.buttonText = 'Salvar Alterações';
    
      this.register.patchValue(this.sale);
    } else {
      this.edit = false;
    }

    this.productServ.getProduct().subscribe((data) =>{
      this.produtos = data
    })

    this.supplyServ.getAll().subscribe((data) =>{
      this.empresas = data
      console.log(data)
    })

  }


  initializeForm() {
    this.register = new FormGroup({
      nome_Empresa: new FormControl(null, [Validators.required]),
      produto_Vendido: new FormControl(null, [Validators.required]), 
      quantidade_Vendida: new FormControl(null, [Validators.required]),
      local_Vendido: new FormControl(null, [Validators.required]),
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
    const message = this.edit ? 'Deseja salvar as alterações desta Venda?' : 'Deseja adicionar esta Venda?';

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
          this.editSale();
          this.dialogRef.close();
        } else {
          this.registerSale(); 
          this.dialogRef.close();
        }
      }
    });
  }

  registerSale() {
    const formData = this.register.value;
    this.sales = {
      ...formData,
    
    };
    this.saleServ.registerSales(this.sales).subscribe((res) => {
      console.log('Fornecedor registrado:', res);
      this.saleServ.getSales()
    });
  }

  editSale() {
    const formData = this.register.value;

    this.sales = {
      ...formData,
      id: this.sale.id,
    };
    this.saleServ.updateSales(this.sales).subscribe((res) => {
      console.log('Venda editada:', res);
      this.dialogRef.close()
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }


  
}
