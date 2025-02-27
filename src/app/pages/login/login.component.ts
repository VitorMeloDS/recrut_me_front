import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      cpf: [null, [Validators.required, this.validarCPF]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[^\s]{8,40}$/
          ),
        ],
      ],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { cpf, password } = this.loginForm.value;
      console.log({ cpf, password });
    }
  }

  // Validação do CPF valido
  validarCPF(control: any) {
    // Remove pontos e hífen
    const cpf = control.value?.replace(/\D/g, '');
    if (!cpf || cpf.length !== 11) return { cpfInvalido: true };

    // Algoritmo de validação do CPF
    let soma = 0;
    let resto;
    // Evita CPFs com números repetidos
    if (/^(\d)\1{10}$/.test(cpf)) return { cpfInvalido: true };

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return { cpfInvalido: true };

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return { cpfInvalido: true };

    // CPF válido
    return null;
  }
}
