import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  
  constructor() {
    // Verificar si hay una sesión activa al iniciar
    this.checkAuthStatus();
  }

  // Guardar datos de autenticación
  setAuthData(authData: AuthResponse): void {
    sessionStorage.setItem('token', authData.token);
    sessionStorage.setItem('usuario', authData.nombre);
    sessionStorage.setItem('email', authData.email);
    this.isAuthenticated.next(true);
  }

  // Obtener token
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Obtener usuario
  getUsuario(): string | null {
    return sessionStorage.getItem('usuario');
  }

  // Obtener email
  getEmail(): string | null {
    return sessionStorage.getItem('email');
  }

  // Verificar si está autenticado
  checkAuthStatus(): boolean {
    const token = this.getToken();
    const isAuth = !!token;
    this.isAuthenticated.next(isAuth);
    return isAuth;
  }

  // Observable para el estado de autenticación
  isAuthenticated$() {
    return this.isAuthenticated.asObservable();
  }

  // Cerrar sesión
  logout(): void {
    sessionStorage.clear();
    this.isAuthenticated.next(false);
  }
}
