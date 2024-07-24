import { Component, Inject, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonServiceService } from '../service/commonService.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private commonservice=inject(CommonServiceService)
  private router=inject(Router)
  logout(){
    this.commonservice.logout()
this.router.navigate(["login"])
  }
}
