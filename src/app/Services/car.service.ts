import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CarInterface } from "../Interface/CarInterface";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn:'root'
})

export class CarService{

 url = 'https://localhost:44348/'

    constructor(private http : HttpClient){}

    getCars() : Observable<CarInterface[]>{
        return this.http.get<CarInterface[]>(this.url + 'api/CarRegister',httpOptions)
    }



}