import { Injectable } from '@angular/core';
import { custom_axios } from '../axious/AxiosSetup';
import { ApiConstants } from '../api/ApiConstants';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { getLoginInfo } from '../utils/loginInfo';

@Injectable({
  providedIn: 'root'
})

export class CommonServiceService {
  
  // private tokenSubject = new BehaviorSubject<string>(localStorage.getItem('token') || '');
  private tokenSubject = new BehaviorSubject<string>(
    typeof localStorage !== 'undefined' ? localStorage.getItem('token') || '' : ''
  ); public token$ = this.tokenSubject.asObservable();
  private userAdminSubject=new BehaviorSubject<boolean>(false)
  public userAdmin$ = this.userAdminSubject.asObservable();
  userData: any;

  constructor(private router: Router, private toastr: ToastrService) { }

  // Function to check if user is authenticated based on token presence
  isAuthenticated(): boolean {
    return !!this.tokenSubject.value; // Converts null or undefined to false, token string to true
  }
  getAllUsers= async()=>{
    try{
  
    let response=await custom_axios.get(ApiConstants.USER.Get_All_User_ForLogin())
    console.log(response.data);
    
     this.userData=response.data
  
 
  
  }catch(error){
      console.log(error);
      }
  }
  // Function to perform login
  async login(email: any, password: any): Promise<void> {
    try {
    
      const response = await custom_axios.post(ApiConstants.LOGIN.Login(), {
        email: email,
        password: password
      });
      
    if(response){
       this.getAllUsers()
      if(this.userData){
        const filterUser = this.userData.find((item: any) => item.role === 'ADMIN');

      if(filterUser?.email===email){
this.userAdminSubject.next(true)
      }

      }
      const token = response.data.token;
      localStorage.setItem('token', token);
      this.tokenSubject.next(token); // Update BehaviorSubject with new token
      this.toastr.success('Login Successfully');
      this.router.navigate(['']);
    } // Navigate to home or desired route after successful login
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
