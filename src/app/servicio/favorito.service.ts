import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/favorites/';

  constructor(private http: HttpClient) { }
  // aqui es donde generamos las cabeceras (headers) para las peticiones como autenticación
  private getAutenticacion(): HttpHeaders {
    const username = 'admin';
    const password = 'admin';
    const encodedCredentials = btoa(`${username}:${password}`); // se codifica en base64 el nombre y la contraseña porque la Autenticación Básica lo requiere asi el estandar
    return new HttpHeaders({
      'Authorization': `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json'
    });
  }
  // esta funcion es  para obtener los favoritos desde el servidor (hacemos un GET)
  obtenerFav(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl, { headers: this.getAutenticacion() }); // hacemos la petición GET a la URL de favoritos y pasamos las cabeceras de autenticación
  }
  // funcion para añadir un favorito (hacemos un POST)
  añadirFav(itemId: number, itemName: string): Observable<any> {
    return this.http.post(this.apiUrl + 'add/', { item_id: itemId, item_name: itemName }, { headers: this.getAutenticacion() });
  }
  
  // funcion  para eliminar un favorito (hacemos un DELETE)
  eliminarFav(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}remove/${itemId}/`, { headers: this.getAutenticacion() });
  }
}
