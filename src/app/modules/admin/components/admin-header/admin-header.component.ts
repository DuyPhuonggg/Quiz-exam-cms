import { Component, EventEmitter, Output } from '@angular/core';
import { NavRoutes } from '@/app/types';

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: [
        '../../pages/admin.component.css',
        './admin-header.component.css',
    ],
})
export class AdminHeaderComponent {
    @Output() onNavigation = new EventEmitter<NavRoutes>();

    handleOnRedirect(route: NavRoutes) {
        this.onNavigation.emit(route);
    }
}
