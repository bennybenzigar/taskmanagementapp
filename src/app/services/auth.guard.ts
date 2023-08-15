import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { DataService } from "./data.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private dataService: DataService,private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.dataService.isAuthenticated()){
      return true
    }

    else{
      this.router.navigateByUrl('login')
      return false
    }
   
  }

}