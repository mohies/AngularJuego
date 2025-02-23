import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../servicio/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Validamos que el campo no esté vacío
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      // Realizamos la llamada al servicio de autenticación para que nos devuelva el usuario
      this.authService.login(username, password).subscribe(response => {
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response));
        this.authService.usernameSubject.next(response.username);  //el next es para actualizar el valor del BehaviorSubject
        this.authService.authStatus.next(true);
        this.router.navigate(['/home']);
      });
    }
  }
}