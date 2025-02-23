import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from './favoritos/favoritos.component';
export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página de inicio
  { path: 'home', component: HomeComponent },
  { path: 'juegos', component: GameListComponent }, // Página específica
  { path: 'game/:id', component: GameDetailsComponent },
  { path: 'contacto', component: ContactFormComponent }, // ⬅ Nueva ruta para el formulario de contacto
  { path: 'login', component: LoginComponent },
  { path: 'favorites', component: FavoritesComponent },
  

  

  
];
