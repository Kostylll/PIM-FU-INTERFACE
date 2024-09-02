import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginInterface } from "../Interface/LoginInterface";
import { Observable } from "rxjs";
import { Router } from '@angular/router'
import Swal from "sweetalert2";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}



@Injectable({
    providedIn: 'root'
})

export class LoginService{

    url = 'https://localhost:44335/'
    private userAuth : string | null = null

    constructor(private http : HttpClient, private router : Router) {}

    sendLogin(login : LoginInterface) : Observable<LoginInterface>{
        return this.http.post<LoginInterface>(this.url + 'api/Login',login, httpOptions)
    }

    setToken(userAuth : string){
        this.userAuth = userAuth
        sessionStorage.setItem('token',userAuth);
        this.router.navigateByUrl('/home');
    }

    getToken() : string | null{
        return this.userAuth || sessionStorage.getItem('token')
    }

    logoutUser(){
        Swal.fire

        sessionStorage.removeItem('token')
        this.router.navigate(['/login'])
    }

    
    isAuthenticated():boolean{
        return !!sessionStorage.getItem('token');
      }
  
      canAccess() {
        if (!this.isAuthenticated()) {
            this.router.navigate(['/login/enter']);
        }
        return true;
    }
  


}