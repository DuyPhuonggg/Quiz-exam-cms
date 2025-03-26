import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrentUser, NavRoutes } from '@/app/types';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['../../pages/admin.component.css'],
})
export class NavigationComponent {
    private _currentUser: CurrentUser = {};
    private _routers: Array<NavRoutes> = [];
    private _isExpandNav: boolean = false;

    @Input()
    set currentUser(value: CurrentUser) {
        this._currentUser = value;
    }
    get currentUser() {
        return this._currentUser;
    }

    @Input()
    set routers(value: any) {
        this._routers = value;
    }
    get routers() {
        return this._routers;
    }

    @Input()
    set isExpandNav(value: boolean) {
        this._isExpandNav = value;
    }
    get isExpandNav() {
        return this._isExpandNav;
    }

    @Output() onNavigation = new EventEmitter<NavRoutes>();
    @Output() onExpandNav = new EventEmitter<boolean>();

    constructor() {}

    handleClick() {
        console.log('NavigationComponent');
    }

    handleNavigation(routes: NavRoutes) {
        this.onNavigation.emit(routes);
    }

    handleExpandNav(isExpand: boolean) {
        this.onExpandNav.emit(isExpand);
    }
}
