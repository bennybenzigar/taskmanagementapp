import { Component , OnInit} from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private dataService:DataService ,private router:Router){}
  ngOnInit(): void {
    
  }

  logout(){
    localStorage.removeItem('currentUser')
    this.dataService.authentcatedUser=false
    this.router.navigateByUrl("login")
  }
}
