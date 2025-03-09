import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = signal(true);
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService, 
    private formBulder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,) 
    {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // Aquí puedes guardar el token en localStorage si lo necesitas
          console.log(response)
          this.authService.setAuthData(response);
          this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
            duration: 10000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });

        },
        error: (error) => {
          console.error('Error en el login:', error.error);
          let mensajeError = 'Error al iniciar sesión';
          
          // Si el servidor devuelve un mensaje específico, lo usamos
          if (error.error?.message) {
            mensajeError = error.error.message;
          }

          this.snackBar.open(mensajeError, 'Cerrar', {
            duration: 10000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
    } 
  }

  clickEvent(event: MouseEvent) {
    console.log('ver no ver:' + this.hide())
    this.hide.set(!this.hide());
    event.stopPropagation();

  }
}





