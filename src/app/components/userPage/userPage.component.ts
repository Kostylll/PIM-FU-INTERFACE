import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ColaboratorService } from '../../Services/colaborator.service';
import { ColaboratorInterface } from '../../Interface/ColaboratorInterface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userPage',
  standalone: true,
  templateUrl: './userPage.component.html',
  imports: [RouterLink,FormsModule],
  styleUrls: ['./userPage.component.css'],
})
export class UserPageComponent implements OnInit {
    
  loggedColaborator: ColaboratorInterface;

  constructor(
    private http: HttpClient,
    private colabServ: ColaboratorService
  ) {}

  ngOnInit() {
    this.getDados()
  }

  formatDate(dateString: string): string {
    const date = new Date(
      dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
    );
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  formatCPF(cpf: string): string {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatPhone(phone: string): string {
    if (!phone) return '';

    phone = phone.replace(/\D/g, '');

    if (phone.length === 11) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (phone.length === 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return phone;
  }


  getDados() {
    var token = sessionStorage.getItem('token') ?? '';

    this.colabServ.getColaboratorById(token).subscribe((res) => {
      console.log(res)
      this.loggedColaborator = res;
    });
  }
}
