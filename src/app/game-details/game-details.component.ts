import { Component, OnInit } from '@angular/core';
import { RawgService } from '../servicio/rawg.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  game: any;

  constructor(private rawgService: RawgService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Obtener el ID del juego desde la URL
    this.route.params.subscribe(link => {
      const gameId = link['id']; // Extrae el ID desde la URL
      if (gameId) {
        // Llama a la API para obtener detalles del juego
        this.rawgService.getGameDetails(gameId).subscribe(response => {
          this.game = response; // Guarda la info del juego
        });
      }
    });
  }

  // Función para navegar a los juegos de una plataforma específica
  verJuegosPorPlataforma(platformId: string) {
    if (platformId) {
      this.router.navigate(['/juegos'], { queryParams: { platform: platformId } });
    }
  }
}
