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

    registerSupply(sale : SupplyInterface) : Observable<SupplyInterface>{
        return this.http.post<SupplyInterface>(this.url + 'api/Supply' ,sale,httpOptions)
    }

    deleteSupply(id : string){
        return this.http.delete<SupplyInterface>(this.url + 'api/Supply?id=' + id)
    }

    getSupplyById(token : string) : Observable<SupplyInterface>{
        return this.http.get<SupplyInterface>(this.url + 'api/Supply/' + token,httpOptions)
    }

    updateSupply(supply : SupplyInterface): Observable<SupplyInterface>{
        return this.http.put<SupplyInterface>(this.url + 'api/Supply/?id=' + supply.id , supply, httpOptions)
    }

}
