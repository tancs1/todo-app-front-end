import { Injectable } from '@angular/core';
import { custom_axios } from '../axious/AxiosSetup';
import { ApiConstants } from '../api/ApiConstants';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class CommonServiceService {
  
  // private tokenSubject = new BehaviorSubject<string>(localStorage.getItem('token') || '');
  private tokenSubject = new BehaviorSubject<string>(
    typeof localStorage !== 'undefined' ? localStorage.getItem('token') || '' : ''
  );
  
  public token$ = this.tokenSubject.asObservable();

  constructor(private router: Router, private toastr: ToastrService) { }

  // Function to check if user is authenticated based on token presence
  isAuthenticated(): boolean {
    return !!this.tokenSubject.value; // Converts null or undefined to false, token string to true
  }

  // Function to perform login
  async login(email: any, password: any): Promise<void> {
    try {
      const response = await custom_axios.post(ApiConstants.LOGIN.Login(), {
        email: email,
        password: password
      });
      
      const token = response.data.token;
      localStorage.setItem('token', token);
      this.tokenSubject.next(token); // Update BehaviorSubject with new token
      this.router.navigate(['']); // Navigate to home or desired route after successful login
      this.toastr.success('Login Successfully');
    } catch (error:any) {
      if (error.response.status === 401) {
        this.toastr.error(error.response.data.message);
      }
    }
  }

  // Function to perform logout
  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(''); // Clear token subject
    this.router.navigate(['/login']); // Navigate to login page after logout
    this.toastr.info('Logged out successfully');
  }
}
