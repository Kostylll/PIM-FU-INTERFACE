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

    registerSales(sale : SalesInterface) : Observable<SalesInterface>{
        return this.http.post<SalesInterface>(this.url + 'api/Sales' ,sale,httpOptions)
    }

    deleteSales(id : string){
        return this.http.delete<SalesInterface>(this.url + 'api/Sales?id=' + id)
    }

    getSalesById(token : string) : Observable<SalesInterface>{
        return this.http.get<SalesInterface>(this.url + 'api/Sales/' + token,httpOptions)
    }

    updateSales(sale : SalesInterface): Observable<SalesInterface>{
        return this.http.put<SalesInterface>(this.url + 'api/Sales/?id=' + sale.id , sale, httpOptions)
    }

}