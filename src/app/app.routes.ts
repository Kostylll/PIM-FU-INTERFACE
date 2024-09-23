import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/loginPage/login.component';

import { ProductComponent } from './components/productPage/product.component';
import { SalesComponent } from './components/salesPage/sales.compoment';
import { UserPageComponent } from './components/userPage/userPage.component';

import { AuthGuard } from './Services/authGuard.service';
import { ColaboratorComponent } from './components/colaboratorPage/colaborator.component';
import { SupplyPopUpComponent } from './components/popUpComponents/colaboratorPopUp.component';
import { SupplyComponent } from './components/supplyPage/supply.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path:'home',
        component: HomeComponent,
        canActivate : [AuthGuard]
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'supply',
        component: SupplyComponent,
        canActivate : [AuthGuard]
    },
    {
        path:'colaborators',
        component: ColaboratorComponent,
        canActivate : [AuthGuard]
    },
    {
        path:'products',
        component: ProductComponent,
        canActivate : [AuthGuard]
    },
    {
        path:'sales',
        component: SalesComponent,
        canActivate : [AuthGuard]
    },
    {
        path:'userPage',
        component:UserPageComponent,
        canActivate : [AuthGuard]
    },
    {
        path:'popUp',
        component: SupplyPopUpComponent,
        canActivate : [AuthGuard]
    }
];


