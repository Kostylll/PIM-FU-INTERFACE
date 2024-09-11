import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { LoginService } from "../Services/login.service";
import Swal from "sweetalert2";
import { ColaboratorService } from "../Services/colaborator.service";
import { ColaboratorInterface } from "../Interface/ColaboratorInterface";

@Component({
    selector:'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [CommonModule,RouterLink],
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
   
    userAuth = sessionStorage.getItem('token')
    user : ColaboratorInterface
    
    constructor(private loginService : LoginService,private colabServ : ColaboratorService){}
 
    ngOnInit() {
        this.getDados()
    }

    getDados() {
      var token = sessionStorage.getItem('token') ?? '';
  
      this.colabServ.getColaboratorById(token).subscribe((res) => {
        console.log(res)
        this.user = res;
      });
    }

    isToken() : boolean{
      return this.user.nome === 'admin'
    }
    
    
    logOut(){
        Swal.fire({
            title: 'Você tem certeza?',
            text: 'Você será deslogado!',
            icon: 'warning',
            iconColor: '#DAD7CD',
            customClass: {
              popup : 'custom-popup',
              confirmButton: 'custom-confirm-button',
              icon: 'custom-icon'
          }
          }).then((result) => {
            if (result.isConfirmed) {
             this.loginService.logoutUser()
            
            }
          });
        }
    }
  
