import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

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
    private formBulder: FormBuilder) 
    {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Aquí irá la lógica de autenticación
      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // Aquí puedes guardar el token en localStorage si lo necesitas
          console.log(response)
          /*if (response.token) {
            localStorage.setItem('token', response.token);
          }*/
          // Redirigir al usuario a la página principal o dashboard
          //this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error en el login:', error.error);
          //this.errorMessage = 'Credenciales inválidas. Por favor, intente nuevamente.';
        }
      });
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();

  }
}





