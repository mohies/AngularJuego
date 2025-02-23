// rawg.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RawgService {
  private baseUrl = 'https://api.rawg.io/api/games?key=e908d77142574a35945bc55e7711e385';

  constructor(private http: HttpClient) { }
 // Método para obtener los juegos
  getGames(pagina: number, paginaSize: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}&page=${pagina}&page_size=${paginaSize}`);
  }
 // Método para obtener los detalles de un juego
  getGameDetails(gameId: string): Observable<any> {
    return this.http.get<any>(`https://api.rawg.io/api/games/${gameId}?key=e908d77142574a35945bc55e7711e385`);
  }
  // Método para obtener los juegos por nombre
  filterJuego(nombreJuego: string, pagina: number): Observable<any> {
    const url = `https://api.rawg.io/api/games?key=e908d77142574a35945bc55e7711e385&page=${pagina}&search=${encodeURIComponent(nombreJuego)}`;
    return this.http.get<any>(url);
  }

  // Método para obtener los juegos por plataforma
  getGamesByPlatform(pagina: number, paginaSize: number, plataformaId: string): Observable<any> {
    const url = `https://api.rawg.io/api/games?key=e908d77142574a35945bc55e7711e385&page=${pagina}&page_size=${paginaSize}&platforms=${plataformaId}`;
    return this.http.get<any>(url);
  }



}