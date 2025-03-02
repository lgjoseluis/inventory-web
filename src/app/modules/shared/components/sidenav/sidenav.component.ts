import { Component, inject, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-sidenav',
  standalone: false,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{
  private authService = inject(AuthServiceService);
  mobileQuery: MediaQueryList;
  menuNav = [
    {name:"Home", route:"home", icon:"home"},
    {name:"Categorías", route:"category", icon:"category"},
    {name:"Productos", route:"product", icon:"production_quantity_limits"}
  ];
  userName:any;
  isAuthenticate:boolean=false;

  ngOnInit(): void {
    this.userName = this.authService.getUsername();
    this.isAuthenticate = this.authService.isAuthenticated();
  }

  constructor(media:MediaMatcher){
    this.mobileQuery = media.matchMedia('max-width: 600px');
  }

  logout(){
    this.authService.logout();
  }
}
