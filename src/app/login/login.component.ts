import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { custom_axios } from '../axious/AxiosSetup';
import { ApiConstants } from '../api/ApiConstants';
import { CommonServiceService } from '../service/commonService.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginForm=new FormGroup({
  email:new FormControl('',Validators.required),
  password:new FormControl('',Validators.minLength(6))
})
  constructor(private tostService:ToastrService, private router :Router, private commonService:CommonServiceService) {
    
  }
  submitLoginForm(){
    if(this.loginForm.value.email !="" && this.loginForm.value.password){
      this.commonService.login(this.loginForm.value.email,this.loginForm.value.password)
    }else{
      this.tostService.error("Please fill the information")
    }
   
   
    
  }}
