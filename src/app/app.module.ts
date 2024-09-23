import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./components/loginPage/login.component";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";

import { ProductComponent } from "./components/productPage/product.component";
import { SalesComponent } from "./components/salesPage/sales.compoment";
import { UserPageComponent } from "./components/userPage/userPage.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from "@angular/material/core";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ColaboratorComponent } from "./components/colaboratorPage/colaborator.component";
import { SupplyPopUpComponent } from "./components/popUpComponents/colaboratorPopUp.component";

@NgModule({
    declarations:[
     
    ],
    
    imports:[
        BrowserModule,
        CommonModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
   
            
    ],
    providers : [
        MatNativeDateModule,
    ],

    exports:[RouterModule],
    
    bootstrap:[]

})

export class AppModule{}