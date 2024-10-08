import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SupplyService } from '../../../Services/supply.service';
import { SupplyInterface } from '../../../Interface/SupplyInterface';
import { CpfValidator } from '../../../Services/CpfValidator';
import { ProductComponent } from '../../productPage/product.component';
import { ProductService } from '../../../Services/product.service';
import { ProductInterface } from '../../../Interface/ProductInterface';

@Component({
  selector: 'app-SupplyPopUp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './productPopUp.component.html',
  styleUrls: ['./productPopUp.component.css'],
})
export class ProductPopUpComponent implements OnInit {
  edit: boolean = false;
  product: ProductInterface;
  TitleText: string = 'Adicionar Produto';
  buttonText: string = 'Adicionar';
  register: FormGroup;
  products = {} as ProductInterface;
  supply : any[] = []


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductPopUpComponent>,
    private productServ: ProductService,
    private supplyServ : SupplyService,

  ) {
    this.product = this.data;
  }

  ngOnInit() {
    this.initializeForm();

    if (this.product) {
      this.edit = true;
      this.TitleText = 'Editar Produto';
      this.buttonText = 'Salvar Alterações';

      this.register.patchValue(this.product);
    } else {
      this.edit = false;
    }

    this.supplyServ.getAll().subscribe((data) =>{
        this.supply = data
    })
  }

  initializeForm() {
    this.register = new FormGroup({
      nome_Produto: new FormControl(null, [Validators.required]),
      quantidade: new FormControl(null, [Validators.required]),
      nome_Empresa: new FormControl(null, [Validators.required]),
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
    const message = this.edit
      ? 'Deseja salvar as alterações deste Produto?'
      : 'Deseja adicionar este Produto?';

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
          this.editProduct();
          this.dialogRef.close();
        } else {
          this.registerProduct();
          this.dialogRef.close();
        }
      }
    });
  }

  registerProduct() {
    const formData = this.register.value;
    this.products = {
      ...formData,
    };
    this.productServ.registerProduct(this.products).subscribe((res) => {
      this.productServ.getProduct();
    });
  }

  editProduct() {
    const formData = this.register.value;

    this.products = {
      ...formData,
      id: this.product.id,
    };
    this.productServ.updateProduct(this.products).subscribe((res) => {
      this.dialogRef.close();
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
