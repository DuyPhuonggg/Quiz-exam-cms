import { inject, Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    // Router,
    RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from '@/app/services';

@Injectable({
    providedIn: 'root',
})
class PermissionsService {
    constructor(
        // private router: Router,
        private localStorageService: LocalStorageService
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const token = this.localStorageService.getToken();
        const currentUser = this.localStorageService.getCurrentUser();
        if (token) {
            const decodeToken = this.localStorageService.decodeToken(token);
            console.log(decodeToken);
        }
        console.log('canActivate', next, state, currentUser);
        // console.log('canActivate', currentUser, state);
        // console.log(this.router);
        return true;
    }
}

export const AuthGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean => {
    return inject(PermissionsService).canActivate(next, state);
};
