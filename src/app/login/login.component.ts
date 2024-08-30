import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginService } from "../Services/login.service";
import { LoginInterface } from "../Interface/LoginInterface";
import Swal from 'sweetalert2';
import { RouterLink } from "@angular/router";


@Component({
    selector: 'app-login',
    standalone: true,
    imports:[ReactiveFormsModule,RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit{

    show: boolean = false

    loginAuth : FormGroup

    loginModel = {} as LoginInterface

    logIn : LoginInterface[];

    constructor(private loginService : LoginService) {}


    ngOnInit() {
      this.loginAuth = new FormGroup({
        name : new FormControl(null,[Validators.required]), 
        password : new FormControl(null,[Validators.required])
      })
    }


    saveLogin(){

        const formData = this.loginAuth.value
        
        let name = this.loginAuth.get('name')?.value;
        let password = this.loginAuth.get('password')?.value;

        this.loginModel.name = name,
        this.loginModel.password = password

        console.log(formData)

        this.loginService.sendLogin(this.loginModel).subscribe((res) =>{
            console.log("Logado como : " ,this.loginModel)
        })

    }

    password(){
        this.show = !this.show;
    }

    mostrarAviso(){
        Swal.fire({
            title: "Esqueceu a senha?",
            text: "Contate o RH para recuperar sua senha",
            icon: "question",
            iconColor: '#DAD7CD',
            confirmButtonText: 'OK',
            customClass: {
                popup : 'custom-popup',
                confirmButton: 'custom-confirm-button',
                icon: 'custom-icon'
            }
          });
    }

    
}