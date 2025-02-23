import { Component, OnInit } from '@angular/core';
import { FavoritoService } from '../servicio/favorito.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritesComponent implements OnInit {
  favoritos: any[] = [];

  constructor(private favoritoService: FavoritoService) { }

  ngOnInit(): void {
    this.cargaFavoritos();
  }

  cargaFavoritos() {
    this.favoritoService.obtenerFav().subscribe((elementos) => {
      this.favoritos = elementos;  // los elementos los asignamos al array de favoritos
    }
    );
  }

  eliminarFav(id: number) {
    this.favoritoService.eliminarFav(id).subscribe(() => {
      this.cargaFavoritos(); // volvemos a cargar los favoritos para que se actualice la lista tras eliminar el favorito
    });
  }
}
