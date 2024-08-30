import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { CarService } from "../Services/car.service";
import { CarInterface } from "../Interface/CarInterface";
import { CommonModule } from "@angular/common";
import { Router } from "express";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { SupplyPopUpComponent } from "../popUpComponents/supplyPopUp.component";

@Component({
    selector:'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [CommonModule,RouterLink],
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
   
 
    ngOnInit() {
        
    }
    
  
  
}