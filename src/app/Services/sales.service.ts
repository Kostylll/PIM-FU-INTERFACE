import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SalesInterface } from "../Interface/SalesInterface";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}


@Injectable({
    providedIn:'root'
})

export class SalesService {

     url = 'https://localhost:44335/'

    constructor(private http : HttpClient ){}

    getSales() : Observable<SalesInterface[]>{
        return this.http.get<SalesInterface[]>(this.url + 'api/Sales', httpOptions)
    }

}