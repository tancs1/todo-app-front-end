import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { CompletedComponent } from './completed/completed.component';
import { ActiveComponent } from './active/active.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { ToastService } from 'angular-toastify';
import { RegisterComponent } from './register/register.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterComponent, UsersComponent, HomeComponent, CompletedComponent, ActiveComponent,HeaderComponent,CommonModule,RouterLink,RouterLinkActive,],
  providers:[ToastService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 
}
