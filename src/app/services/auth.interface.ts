export interface AuthResponse {
    token: string;
    email: string;
    nombre: string;
}
  
export interface LoginRequest {
    email: string;
    contrasenia: string;
}
  