import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginInterface } from "../Interface/LoginInterface";
import { Observable } from "rxjs";

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

    constructor(private http : HttpClient) {}

    sendLogin(login : LoginInterface) : Observable<LoginInterface>{
        return this.http.post<LoginInterface>(this.url + 'api/Login',login, httpOptions)
    }


}