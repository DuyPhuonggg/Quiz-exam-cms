import { Component, Input } from '@angular/core';
import { NavRoutes } from '@/app/types';

@Component({
    selector: 'app-admin-body',
    templateUrl: './admin-body.component.html',
    styleUrls: ['../../pages/admin.component.css'],
})
export class AdminBodyComponent {
    private _activeRouter: NavRoutes = {
        id: 0,
        label: '',
        href: '',
        active: false,
    };

    @Input()
    set activeRouter(value: NavRoutes) {
        this._activeRouter = value;
    }
    get activeRouter() {
        return this._activeRouter;
    }

    constructor() {}
}
