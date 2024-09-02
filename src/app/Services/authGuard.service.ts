import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { LoginService } from "./login.service";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate{

constructor ( private auth : LoginService, private router : Router){}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.auth.isAuthenticated()){
        return true
    }
    this.router.navigate(['/login'])
    return false
}




}