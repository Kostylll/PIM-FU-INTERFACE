import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductInterface } from "../Interface/ProductInterface";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn : 'root'
})
export class ProductService {

     url = 'https://localhost:44335/'

    constructor(private http : HttpClient){}

    getProduct() : Observable<ProductInterface[]>{
        return this.http.get<ProductInterface[]>(this.url + 'api/Products' , httpOptions)
    }
    
}