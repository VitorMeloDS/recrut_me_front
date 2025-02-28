import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { Auth } from '@shared/interfaces/auth.interface';
import { cpf } from 'cpf-cnpj-validator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) {}

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
      const body: Auth = this.loginForm.value;

      this.authService.login(body).subscribe({
        next: (value) => {
          localStorage.setItem('token', value?.token);
          localStorage.setItem('refreshToken', value?.refreshToken);
          this.router.navigateByUrl('/perfil');
        },

        error: (err) => {
          this.matSnackBar.open(err.error.message, 'Erro', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            direction: 'rtl',
          });
        },
      });
    }
  }

  validarCPF(control: any) {
    return cpf.isValid(control.value) ? null : { cpfInvalido: true };
  }
}
