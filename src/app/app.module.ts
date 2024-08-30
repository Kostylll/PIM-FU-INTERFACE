import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { ColaboratorComponent } from "./colaboratorPage/colaborator.component";
import { ProductComponent } from "./productPage/product.component";
import { SalesComponent } from "./salesPage/sales.compoment";
import { UserPageComponent } from "./userPage/userPage.component";
import { SupplyPopUpComponent } from "./popUpComponents/supplyPopUp.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from "@angular/material/core";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    declarations:[
        HomeComponent,
        LoginComponent,
        ColaboratorComponent,
        ProductComponent,
        SalesComponent,
        UserPageComponent,
        SupplyPopUpComponent
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
    
    bootstrap:[HomeComponent]

})

export class AppModule{}