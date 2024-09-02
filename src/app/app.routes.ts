import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SupplyComponent } from './supplyPage/supply.component';
import { ColaboratorComponent } from './colaboratorPage/colaborator.component';
import { ProductComponent } from './productPage/product.component';
import { SalesComponent } from './salesPage/sales.compoment';
import { UserPageComponent } from './userPage/userPage.component';
import { SupplyPopUpComponent } from './popUpComponents/supplyPopUp.component';
import { AuthGuard } from './Services/authGuard.service';

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


