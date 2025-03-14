import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-registro-de-usuarios',
  templateUrl: './registro-de-usuarios.component.html',
  styleUrl: './registro-de-usuarios.component.scss'
})
export class RegistroDeUsuariosComponent {
  hide = signal(true);
  registroFormCliente: FormGroup;
  registroFormJardinero: FormGroup;
  tipoUsuario: boolean = true; // true:cliente, false: jardinero

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.registroFormCliente = this.fb.group({
      telefono: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registroFormJardinero = this.fb.group({
      telefono: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
    });
  }



  onSubmit() {
    console.log(this.tipoUsuario)
    if(this.tipoUsuario == true){
      if (this.registroFormCliente.valid) {
        console.log(this.registroFormCliente.value);
        // llamar un servicio de registro del jardinero
      }else{
        console.log('falta algo en el formulario de cliente')
      }
    }else{ 
      if (this.registroFormJardinero.valid) {
        console.log(this.registroFormJardinero.value);
        // llamar un servicio de registro del cliente
      }else{
        console.log('falta algo en el formulario de jardinero')
      }
    }
      
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onTabChange(event: MatTabChangeEvent) {
    // El índice 0 es Cliente, el índice 1 es Jardinero
    this.tipoUsuario = event.index === 0;
    console.log('Tipo de usuario:', this.tipoUsuario ? 'Cliente' : 'Jardinero');
  }

}
