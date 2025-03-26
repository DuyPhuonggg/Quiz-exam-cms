import { Component, Input } from '@angular/core';
import { CurrentUser } from '@/app/types';

@Component({
    selector: 'app-dashboard-main',
    templateUrl: './dashboard-main.component.html',
    styleUrls: ['./dashboard-main.component.css'],
})
export class DashboardMainComponent {
    @Input() currentInfo: CurrentUser | undefined = {
        email: '',
        firstName: '',
        lastName: '',
        username: '',
    };
}
