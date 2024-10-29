import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) {}

    canActivate(route: any): boolean {
        const expectedRole = route.data.expectedRole;
        const userType = localStorage.getItem('userType');
        console.log(userType);

        if (userType !== expectedRole) {
            this.router.navigate(['/access-denied']);
            return false;
        }

        return true;
    }
}
