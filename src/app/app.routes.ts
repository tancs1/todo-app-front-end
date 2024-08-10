import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActiveComponent } from './active/active.component';
import { CompletedComponent } from './completed/completed.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
   {path: '', redirectTo: "active", pathMatch:"full"},
   {path:'active',component:ActiveComponent,canActivate:[authGuard]},
   {path:'completed',component:CompletedComponent,canActivate:[authGuard]},
   {path:'login',component:LoginComponent},
   {path:'signup',component:RegisterComponent},
{path:'users',component:UsersComponent,canActivate:[authGuard]}

   
 
];
