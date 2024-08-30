import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}


@Injectable({
    providedIn:'root'
})

export class SalesService {

 url = 'https://localhost:44348/'



}