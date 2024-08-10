import { Component, Inject, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonServiceService } from '../service/commonService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private router=inject(Router)
  isAdmin:boolean=false
  constructor( public commonservice:CommonServiceService){
    
  }
  ngOnInit(): void {
    this.commonservice.userAdmin$.subscribe((item:any)=>{
      this.isAdmin=item
      console.log(this.isAdmin);
      
          })
  }
 
  logout(){
    this.commonservice.logout()
this.router.navigate(["login"])
  }
}
