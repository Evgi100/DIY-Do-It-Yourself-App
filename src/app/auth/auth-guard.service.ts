import { CanActivate } from "@angular/router/src/interfaces";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from '@angular/router'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    // canActivate lets us return an objectible / promise or boolean
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuthenticated()) {
            return true
        }
        this.router.navigate(['/signup'])
    }
}