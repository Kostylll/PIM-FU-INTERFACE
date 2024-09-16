import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ColaboratorInterface } from "../Interface/ColaboratorInterface";
import { SupplyInterface } from "../Interface/SupplyInterface";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}


@Injectable({
    providedIn : 'root'
})

export class SupplyService{

    url = 'https://localhost:44335/'

    constructor(private http : HttpClient){}


    getAll() : Observable<SupplyInterface[]>{
        return this.http.get<SupplyInterface[]>(this.url + 'api/Supply',httpOptions)
    }

}
