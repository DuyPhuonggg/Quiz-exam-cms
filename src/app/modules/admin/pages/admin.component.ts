import { Component, OnInit } from '@angular/core';
import { CurrentUser, NavRoutes } from '@/app/types';
import { LocalStorageService } from '@/app/services';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FULL_NAVIGATION } from '@/app/contants/navigation.constant';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
    private _currentUser: CurrentUser = {};
    private _routers: Array<NavRoutes> = [];
    private _activeRouter: NavRoutes = FULL_NAVIGATION[3];

    isLogin: boolean = false;
    isExpandNav: boolean = false;
    storageSub$: Subscription | undefined;

    set currentUser(value: CurrentUser) {
        this._currentUser = value;
    }
    get currentUser(): CurrentUser {
        return this._currentUser;
    }

    set routes(value: Array<NavRoutes>) {
        this._routers = value;
    }
    get routes(): Array<NavRoutes> {
        return this._routers;
    }

    set activeRouter(value: NavRoutes) {
        this._activeRouter = value;
    }
    get activeRouter(): NavRoutes {
        return this._activeRouter;
    }

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService
    ) {
        this._routers = FULL_NAVIGATION.slice(0, 4);
    }

    ngOnInit() {
        this._currentUser = this.localStorageService.getCurrentUser();
        this.isLogin = !!this.localStorageService.getToken();

        this.storageSub$ = this.localStorageService
            .watchStorage()
            .subscribe((status) => {
                if (status === 'added' || status === 'removed') {
                    this._currentUser =
                        this.localStorageService.getCurrentUser();
                }
            });
    }

    async onRedirect(route: NavRoutes) {
        if (route.label === 'Logout') {
            this.localStorageService.removeToken();
            await this.router.navigate(['join']);
            this.localStorageService.removeCurrentUser();
            return;
        }
        this.routes.forEach((route) => (route.active = false));
        this.routes[route.id].active = true;
        this.activeRouter = route;
    }

    onExpandNav(isExpand: boolean) {
        this.routes = isExpand ? FULL_NAVIGATION : this.routes.slice(0, 4);
        this.isExpandNav = isExpand;
    }
}
