import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RawgService } from '../servicio/rawg.service';
import { FavoritoService } from '../servicio/favorito.service';
import { AuthService } from '../servicio/auth.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  // Lista de juegos a mostrar
  public juegos: any[] = [];

  // pagina en la que estamos actualmente para paginar
  public currentPage: number = 1;

  // numero de juegos que queremos que aparezacan en cada página
  public pageSize: number = 21;

  // Estado que indica si se está realizando una búsqueda
  public searching: boolean = false;

  // Almacena el criterio de orden actual
  public ordenActual: string = '';

  // Imagen de la plataforma seleccionada
  public imagen: string = '';

  // ARRAY de favoritos (id de juegos favoritos)
  public favoritos: any[] = [];

  // Estado de si el usuario está autenticado o no
  public isAuthenticated: boolean = false;

  constructor(private rawgService: RawgService, private router: Router, private route: ActivatedRoute, private favoritoService: FavoritoService,
    private authService: AuthService) { }

  // Método que se ejecuta al iniciar el componente (OnInit) para cargar los juegos y los favoritos del usuario autenticado (si hay) 
  ngOnInit() {
    this.route.queryParams.subscribe(link => {
      const query = link['search'];
      if (query) {
        this.buscarJuegoDirecto(query);
      } else {
        this.cargarJuegos();
      }
    });

    this.authService.isAuthenticated.subscribe(autenticado => {
      this.isAuthenticated = autenticado;
      if (autenticado == true) {
        this.cargarFavoritos();
      } else {
        this.favoritos = [];
      }
    });
  }


  // Esta función busca juegos por nombre
  buscarJuegoDirecto(nombreJuego: string) {
    // Primero, marcamos que estamos buscando algo
    this.searching = true;

    // Llamamos al servicio que hace la búsqueda y pasamos el nombre del juego y la página actual
    this.rawgService.filterJuego(nombreJuego, this.currentPage).subscribe(response => {
      // Cuando nos llega la respuesta, guardamos los juegos encontrados en la variable "juegos"
      this.juegos = response.results;

      // Si ya hemos ordenado los juegos antes, aplicamos ese orden
      if (this.ordenActual) {
        this.ordenarPor(this.ordenActual);
      }
    });
  }



  cargarJuegos() {
    this.route.queryParams.subscribe(link => {
      const plataformaId = link['platform']; // Obtenemos el id de la plataforma de la URL
      if (plataformaId) { // Si hay una plataforma seleccionada
        this.rawgService.getGamesByPlatform(this.currentPage, this.pageSize, plataformaId).subscribe(response => {
          this.juegos = response.results;
          this.actualizarImagenPlataforma(plataformaId);
          if (this.ordenActual) {
            this.ordenarPor(this.ordenActual);
          }
        });
      } else {
        this.rawgService.getGames(this.currentPage, this.pageSize).subscribe(response => {
          console.log(response);
          this.juegos = response.results;
          if (this.ordenActual) {
            this.ordenarPor(this.ordenActual);
          }
        });
 
      }
    });
  }

  // Función para cargar los favoritos del usuario autenticado
  cargarFavoritos() {
    this.favoritoService.obtenerFav().subscribe(elementos => {
      this.favoritos = elementos;
    });
  }

// Función para añadir o eliminar un juego de favoritos
  anadirFav(game: any) {
    if (this.favoritos.includes(game.id) == false) {
      this.favoritoService.añadirFav(game.id, game.name).subscribe(() => {
        this.favoritos.push(game.id);
      });
    } else {
      this.favoritoService.eliminarFav(game.id).subscribe(() => {
        this.favoritos = this.favoritos.filter((id) => id !== game.id);
      });
    }
  }


  // Función para buscar un juego por nombre
  buscarJuego(event: any) {
    const nombreJuego = event.target.value.trim();
    if (nombreJuego !== '') {
      this.searching = true;
      this.rawgService.filterJuego(nombreJuego, this.currentPage).subscribe(response => {
        this.juegos = response.results;
        if (this.ordenActual) {
          this.ordenarPor(this.ordenActual);
        }
      });
    } else {
      this.cargarJuegos();
    }
  }

  // Función para paginar
  nextPage() {
    this.currentPage++;
    this.cargarJuegos();
  }
  // Función para paginar hacia atrás
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cargarJuegos();
    }
  }
  // Función para navegar a la página de detalles de un juego
  verDetalles(gamesId: number) {
    this.router.navigate(["/game", gamesId]);
  }
  // Función para ordenar los juegos por nombre, rating o metacritic
  ordenarPor(event: any){
    let criterio = event.target ? event.target.value : event;
    if (criterio !== '') {
      this.ordenActual = criterio;
      if (criterio === 'nombre') {
        this.juegos.sort((a, b) => a.name.localeCompare(b.name));
      } else if (criterio === 'rating') {
        this.juegos.sort((a, b) => b.rating - a.rating);
      } else if (criterio === 'metacritic') {
        this.juegos.sort((a, b) => b.metacritic - a.metacritic);
      }
    }
  }

// Función para actualizar la imagen de la plataforma seleccionada
  actualizarImagenPlataforma(plataformaId: string) {
    switch (plataformaId) {
      case '4':
        this.imagen = 'https://i.blogs.es/3f45c4/pcpotente-ap/1366_2000.jpeg';
        break;
      case '18':
        this.imagen = 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/09/ps4-pro-buena.jpg?tf=3840x';
        break;
      case '1':
        this.imagen = 'https://media.game.es/COVERV2/3D_L/115/115159.png';
        break;
      case '7':
        this.imagen = 'https://m.media-amazon.com/images/I/81IQp9uUdRL._AC_UF894,1000_QL80_.jpg';
        break;
      case '14':
        this.imagen = 'https://img.asmedia.epimg.net/resizer/v2/V3DS72W4RNCIHDX52RVUUQEGYQ.jpg?auth=4d48769e74711bf5f16417d7b747875a5209074a946b2a8f0acc8c01b8b95100&width=1472&height=828&smart=true';
        break;
      case '186':
        this.imagen = 'https://cms-assets.xboxservices.com/assets/f0/8d/f08dfa50-f2ef-4873-bc8f-bcb6c34e48c0.png?n=642227_Hero-Gallery-0_C2_857x676.png';
        break;
      case '187':
        this.imagen = 'https://m.media-amazon.com/images/I/51WfMQv0uDL.jpg';
        break;
      case '16':
        this.imagen = 'https://i.ebayimg.com/images/g/ScsAAOSwEvZmqQa2/s-l1200.jpg';
        break;
      case '5':
        this.imagen = 'https://i.ytimg.com/vi/__5F_NRkyDg/maxresdefault.jpg';
        break;
      default:
        this.imagen = '';
        break;
    }
  }

}
