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
        
        let nome = this.loginAuth.get('name')?.value;
        let senha = this.loginAuth.get('password')?.value;

        this.loginModel.nome = nome,
        this.loginModel.senha = senha

        console.log(formData)

        this.loginService.sendLogin(this.loginModel).subscribe((res) =>{
            if(res.userAuth != null){
            const token = res.userAuth;
            this.loginService.setToken(token)
            console.log("Logado como : " ,this.loginModel,token)
            }else{
                Swal.fire({
                    icon: 'warning',
                    title:"Insira um Colaborador válido!",
                    confirmButtonText: 'OK',
                    customClass: {
                        popup : 'custom-popup',
                        confirmButton: 'custom-confirm-button',
                        icon: 'custom-icon'
                    }
                })
            }
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