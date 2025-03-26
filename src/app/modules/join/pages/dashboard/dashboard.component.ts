import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '@/app/types';
import { Router } from '@angular/router';
import { LocalStorageService } from '@/app/services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    currentInfo: CurrentUser | undefined;
    isLogin: boolean = false;

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService
    ) {}

    ngOnInit() {
        this.currentInfo = this.localStorageService.getCurrentUser();
        this.isLogin = !!this.localStorageService.getToken();
    }

    async onRedirect() {
        await this.router.navigate(['join', 'dashboard']);
    }
}
