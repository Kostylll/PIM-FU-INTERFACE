import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SupplyComponent } from './supplyPage/supply.component';
import { ColaboratorComponent } from './colaboratorPage/colaborator.component';
import { ProductComponent } from './productPage/product.component';
import { SalesComponent } from './salesPage/sales.compoment';
import { UserPageComponent } from './userPage/userPage.component';
import { SupplyPopUpComponent } from './popUpComponents/supplyPopUp.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'supply',
        component: SupplyComponent
    },
    {
        path:'colaborators',
        component: ColaboratorComponent
    },
    {
        path:'products',
        component: ProductComponent
    },
    {
        path:'sales',
        component: SalesComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'userPage',
        component:UserPageComponent
    },
    {
        path:'popUp',
        component: SupplyPopUpComponent
    }
];


