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
    
    registerProduct(product : ProductInterface) : Observable<ProductInterface>{
        return this.http.post<ProductInterface>(this.url + 'api/Products' ,product,httpOptions)
    }

    deleteProduct(id : string){
        return this.http.delete<ProductInterface>(this.url + 'api/Products?id=' + id)
    }

    getProductById(token : string) : Observable<ProductInterface>{
        return this.http.get<ProductInterface>(this.url + 'api/Products/' + token,httpOptions)
    }

    updateProduct(product : ProductInterface): Observable<ProductInterface>{
        return this.http.put<ProductInterface>(this.url + 'api/Products/?id=' + product.id , product, httpOptions)
    }


}