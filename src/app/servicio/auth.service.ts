import { Injectable, Inject, PLATFORM_ID } from '@angular/core';// Import Injectable, Inject y PLATFORM_ID de @angular/core para crear un servicio inyectable y obtener la plataforma en la que se está ejecutando la aplicación.
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs'; // Import BehaviorSubject y Observable de rxjs para manejar el estado de autenticación y la comunicación con el
// servidor respectivamente.
import { isPlatformBrowser } from '@angular/common';  // Import isPlatformBrowser from @angular/common para verificar si la aplicación se está ejecutando en el navegador o en el servidor.

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1';

  private isBrowser: boolean;
  public authStatus: BehaviorSubject<boolean>; //BehaviorSubject es un tipo de Subject, un sujeto especial que comienza con un valor inicial y emite el valor actual a todos los nuevos suscriptores.
  public usernameSubject: BehaviorSubject<string>;

  public isAuthenticated;
  public username;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    // Verifica si la aplicación se está ejecutando en el navegador o en el servidor.
    this.isBrowser = isPlatformBrowser(this.platformId);
    //Esto comprueba si hay un usuario almacenado en el almacenamiento local habiendose ejecutado en el navegador
    const storedUser = this.isBrowser ? localStorage.getItem('user') : null;
    // Inicializa el BehaviorSubject con el estado de autenticación almacenado en el almacenamiento local o false si no hay usuario almacenado.
    this.authStatus = new BehaviorSubject<boolean>(storedUser !== null);
    this.isAuthenticated = this.authStatus;
    // Inicializa el BehaviorSubject con el nombre de usuario almacenado en el almacenamiento local o null si no hay usuario almacenado.
    this.usernameSubject = new BehaviorSubject<string>(storedUser ? JSON.parse(storedUser).username : null);
    this.username = this.usernameSubject;
  }

  // Implementa el método de registro en el servicio de autenticación. Este método recibe un nombre de usuario y una contraseña, y realiza una solicitud POST al servidor para registrar un nuevo usuario.
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, { username, password });
  }

  // Implementa el método de registro en el servicio de autenticación. Este método recibe un nombre de usuario y una contraseña, y realiza una solicitud POST al servidor para registrar un nuevo usuario.
  logout() {
    this.http.post<any>(`${this.apiUrl}/logout/`, {}).subscribe(response => {
      console.log('Cierre sesion Exitoso', response);
    }

    );
    // Elimina el usuario almacenado en el almacenamiento local y actualiza el estado de autenticación.
    if (this.isBrowser) {
      localStorage.removeItem('user');
    }
    this.authStatus.next(false);
  }



}
