import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-de-usuarios',
  templateUrl: './registro-de-usuarios.component.html',
  styleUrl: './registro-de-usuarios.component.scss'
})
export class RegistroDeUsuariosComponent {
  hide = signal(true);
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.registroForm = this.fb.group({
      telefono: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
    });
  }



  onSubmit() {
    if (this.registroForm.valid) {
      console.log(this.registroForm.value);
      // llamar un servicio de registro del jardinero
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
