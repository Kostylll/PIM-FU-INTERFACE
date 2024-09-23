import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ColaboratorInterface } from "../Interface/ColaboratorInterface";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}



@Injectable({
    providedIn:'root'
})

export class ColaboratorService{

     url = 'https://localhost:44335/'

    constructor(private http : HttpClient){}


    getAll() : Observable<ColaboratorInterface[]>{
        return this.http.get<ColaboratorInterface[]>(this.url + 'api/Colaborador',httpOptions)
    }
    
    registerColaborator(colaborator : ColaboratorInterface) : Observable<ColaboratorInterface>{
        return this.http.post<ColaboratorInterface>(this.url + 'api/Colaborador' ,colaborator,httpOptions)
    }

    deleteColaborator(id : string){
        return this.http.delete<ColaboratorInterface>(this.url + 'api/Colaborador?id=' + id)
    }

    getColaboratorById(token : string) : Observable<ColaboratorInterface>{
        return this.http.get<ColaboratorInterface>(this.url + 'api/Colaborador/' + token,httpOptions)
    }

    updateColaborator(colaborador : ColaboratorInterface): Observable<ColaboratorInterface>{
        return this.http.put<ColaboratorInterface>(this.url + 'api/Colaborador/?id=' + colaborador.id , colaborador, httpOptions)
    }
}