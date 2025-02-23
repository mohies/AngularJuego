import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './servicio/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //  Capturamos el input del buscador
  @ViewChild('searchInput') searchInput!: ElementRef;

  public isAuthenticated: boolean = false;
  public usuario: string = ''; // Variable para almacenar el nombre de usuario


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(authStatus => {
      this.isAuthenticated = authStatus;
    });
    this.authService.username.subscribe(nombre => {
      this.usuario = nombre;
    });
  }

  buscarJuegoHeader(event: SubmitEvent) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    // Obtener el valor del input
    const busqueda = this.searchInput.nativeElement.value.trim();
    if (busqueda) {
      // Navegar al componente de juegos con el parámetro de búsqueda
      this.router.navigate(['/juegos'], { queryParams: { search: busqueda } });
      // Limpiar el campo de búsqueda
      this.searchInput.nativeElement.value = ''; // Aquí limpiamos el campo de búsqueda
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
