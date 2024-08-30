import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { CarInterface } from "../Interface/CarInterface";

@Component({
    selector: 'app-SupplyPopUp',
    standalone: true,
    imports:[CommonModule,ReactiveFormsModule,FormsModule,MatDialogModule],
    templateUrl: './supplyPopUp.component.html',
    styleUrls : ['./supplyPopUp.component.css']
})

export class SupplyPopUpComponent implements OnInit{
    
    cars: CarInterface;
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any, 
        private dialogRef: MatDialogRef<SupplyPopUpComponent>
    ) {
        
        this.cars = this.data;
    }
    
    
    ngOnInit() {
        console.log(this.cars)
    }


  onClose(): void {
    this.dialogRef.close();
  }

}