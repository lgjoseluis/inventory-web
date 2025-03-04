import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private authService = inject(AuthService);

  constructor() { }

  getRoles(){
    return this.authService.getRoles();
  }

  hasRole(roles: string[]): boolean {
    const userRoles = this.getRoles();

    return roles.some(role => userRoles.includes(role));
  }
}
