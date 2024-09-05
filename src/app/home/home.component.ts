import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { LoginService } from "../Services/login.service";
import Swal from "sweetalert2";

@Component({
    selector:'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [CommonModule,RouterLink],
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
   
    userAuth = sessionStorage.getItem('token')
    
    constructor(private loginService : LoginService){}
 
    ngOnInit() {
        
    }


    isToken() : boolean{
      return this.userAuth === '81280782-61b0-45bf-86b9-6589cf5a8c5f'
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
  
