import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cpf } from 'cpf-cnpj-validator';

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
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[^\s]{8,}$/
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

  validarCPF(control: any) {
    return cpf.isValid(control.value) ? null : { cpfInvalido: true };
  }
}
