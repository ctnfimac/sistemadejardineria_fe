import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface LoginResponse {
  token?: string;
  // Agrega aquí otras propiedades que devuelva tu API
}

interface LoginRequest {
  email: string;
  contrasenia: string;
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://127.0.0.1:8080/api/auth';
  //private apiTest = 'https://epok.buenosaires.gob.ar/catastro/geometria/?smp=045-128-009A'

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }
}
