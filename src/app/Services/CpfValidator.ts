import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CpfValidator {

  static validarCpf(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value?.replace(/\D/g, ''); 
    if (!cpf || cpf.length !== 11) {
      return { cpfInvalido: true };
    }

    let soma = 0;
    let resto;


    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return { cpfInvalido: true };
    }

    soma = 0;


    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return { cpfInvalido: true };
    }

    return null; 
  }

  static validarCnpj(control: AbstractControl): ValidationErrors | null {
    const cnpj = control.value?.replace(/\D/g, ''); 
    if (!cnpj || cnpj.length !== 14) {
      return { cnpjInvalido: true };
    }

    
    if (/^(\d)\1+$/.test(cnpj)) {
      return { cnpjInvalido: true };
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) {
      return { cnpjInvalido: true };
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) {
      return { cnpjInvalido: true };
    }

    return null; 
  }
}





